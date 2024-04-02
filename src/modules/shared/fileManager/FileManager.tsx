import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { message } from '@/i18n/src/messages'
import type { FILE_TYPE } from '@/types/constants/files'
import executeRequest from '@/utils/executeRequest'
import { uniFetcher } from '@/utils/fetcher'

import { PandaTable } from '../table/pandaTable/PandaTable'
import FileActions, { FileNameEditor, TagInput } from './FileActions'
import type { FileItem } from './types'
import { Badge } from '@/components/visuals/Badge'
import { v4 } from 'uuid'
import { XMarkIcon } from '@heroicons/react/24/outline'

const messages = message.common.files

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const endpoint = `/api/${itemType}/${uid}/files`
  const { data: files, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)
  const [loading, setLoading] = useState<Array<boolean>>([])
  const [newFile, setNewFile] = useState<Array<{ name: string; payload: string }>>([])

  const onDrop = useCallback(async (files: File[]) => {
    const updatedFiles = await Promise.all(
      files.map(
        file =>
          new Promise<{ name: string; payload: string }>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({ name: file.name, payload: reader.result as string })
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
      )
    )
    setNewFile(updatedFiles)
  }, [])

  const handlePost = useCallback(() => {
    const fileLoading = newFile.map(() => true)
    setLoading(fileLoading)
    newFile.forEach((file, index) => {
      const { name, payload } = file
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(
        endpoint,
        { method: 'post', body },
        res => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          mutate([...(files ?? []), res])
          toast.success(`Uploaded ${name}`)
        },
        () => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          toast.error(`Failed to upload ${name}`)
        }
      )
    })
    setNewFile([])
  }, [endpoint, mutate, files, newFile])

  const handlePut = useCallback(
    (id: string, body: { name?: string; tags?: string[] }) => {
      executeRequest<FileItem>(
        `${endpoint}/${id}`,
        { method: 'PUT', body: JSON.stringify(body) },
        res => {
          toast.success(`${res.name} - was updated`)
        },
        () => {
          toast.error(`Failed to update file`)
        }
      )
    },
    [endpoint]
  )

  useEffect(() => {
    newFile.length > 0 && handlePost()
  }, [newFile, handlePost])

  // Define columns for useGeneralTable
  const columns = useMemo(() => {
    const cols: ColumnDef<FileItem, any>[] = [
      {
        header: 'actions',
        size: 20,
        cell: ({ row: { original } }) => (
          <FileActions file={original} mutate={mutate} endpoint={endpoint} files={files} hasEditRole={hasEditRole} />
        )
      },
      {
        header: 'File name',
        accessorKey: 'name',
        filterFn: 'fuzzy',
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ getValue, row: { original } }) => (
          <FileNameEditor
            initialFileName={getValue()}
            onConfirm={(newName: string) => {
              if (original.name === newName) return
              handlePut(original.id, { name: newName, tags: original.tags })
              mutate(prev => (prev || []).map(v => (v.id === original.id ? { ...v, name: newName } : v)), {
                revalidate: false
              })
            }}
          />
        )
      },
      {
        header: 'Tags',
        accessorKey: 'tags',
        filterFn: 'fuzzy',
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center">
            {getValue() &&
              getValue().map((v: string) => (
                <Badge key={v4()} className="mt-1">
                  {v}
                  <XMarkIcon
                    className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
                    onClick={() => {
                      handlePut(original.id, { name: original.name, tags: (original.tags || []).filter(f => f !== v) })
                      mutate(
                        prevs =>
                          (prevs || []).map(prev =>
                            prev.id === original.id
                              ? { ...prev, tags: getValue()?.filter((f: string) => f !== v) }
                              : prev
                          ),
                        { revalidate: false }
                      )
                    }}
                  />
                </Badge>
              ))}
            <TagInput
              onConfirm={(tag: string) => {
                if (original.tags?.includes(tag)) return
                handlePut(original.id, { name: original.name, tags: [...(original.tags || []), tag] })
                mutate(
                  prev => (prev || []).map(v => (v.id === original.id ? { ...v, tags: [...(v.tags || []), tag] } : v)),
                  { revalidate: false }
                )
              }}
            />
          </div>
        )
      },
      {
        header: 'Size',
        accessorKey: 'size',
        size: 20,
        enableColumnFilter: false,
        meta: {
          className: 'text-right'
        },
        cell: ({ getValue }) => {
          const size = Math.round(getValue() / 1000)

          const sizeString = size > 1000 ? `${Math.round(size / 1000)} MB` : `${size} KB`

          return <span>{sizeString}</span>
        }
      }
    ]

    return cols
  }, [hasEditRole, files, endpoint, mutate, handlePut])

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const { onClick, ...restRootProps } = getRootProps()

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    fileInputRef.current?.click() && onClick && onClick(e)
  }

  return (
    <div>
      <Heading text={messages.title}>
        {hasEditRole && (
          <Fragment>
            <div {...restRootProps}>
              <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
              <PlusButton buttonSize="large" primary={!isDragActive} type={'button'} onClick={onClickHandler} />
            </div>
          </Fragment>
        )}
      </Heading>
      {loading.some(value => value) && <ProgressBarComponent />}
      {files && (
        <PandaTable
          {...{
            tableId: 'filemanager',
            data: files,
            columns,
            settings: {
              enableSorting: true,
              manualSorting: false,
              enableFiltering: true,
              manualFiltering: false
            }
          }}
        />
      )}
    </div>
  )
}

export default FileManager
