// import React, { useCallback, useEffect, useState } from "react";
// import {
//   onAddNewList,
//   onDeleteSelectedList,
//   onEditBoardList,
//   onUpdateCardCategory,
// } from "../../../../redux/actions";
// import AddCard from "./List/AddCard";
// import AppsContent from "@crema/core/AppsContainer/AppsContent";
// import { useDispatch } from "react-redux";
// import CardDetail from "./List/CardDetail";
// import ListHeader from "./List/ListHeader";
// import AddCardButton from "./List/AddCardButton";
// import AddNewList from "./AddNewList";
// import NewListButton from "./NewListButton";
// import { Box, useTheme } from "@mui/material";
// import {
//   BoardObj,
//   CardListObj,
//   CardObj,
// } from "../../../../types/models/apps/ScrumbBoard";
//
// interface BoardWrapperProps {
//   childred: any;
// }
//
// const BoardWrapper: React.FC<BoardWrapperProps> = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         height: 1,
//         "& .smooth-dnd-container.horizontal": {
//           height: 1,
//         },
//       }}>
//       {children}
//     </Box>
//   );
// };
//
// interface BoardDetailViewProps {
//   boardDetail: BoardObj;
// }
//
// interface BoardDataProps {
//   lanes: CardListObj[] | null;
//   id: number;
//   name: string;
//   list: CardListObj[];
// }
//
// const BoardDetailView: React.FC<BoardDetailViewProps> = ({ boardDetail }) => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [list, setList] = useState<CardListObj | null>(null);
//
//   const [isAddCardOpen, setAddCardOpen] = useState(false);
//
//   const [selectedCard, setSelectedCard] = useState<CardObj | null>(null);
//
//   const getBoardData = useCallback(() => {
//     return {
//       ...boardDetail,
//       lanes: boardDetail.list,
//     };
//   }, [boardDetail]);
//
//   const [boardData, setBoardData] = useState<BoardDataProps>(getBoardData());
//
//   useEffect(() => {
//     setBoardData(getBoardData());
//   }, [boardDetail, getBoardData]);
//
//   const shouldReceiveNewData = (nextData: any) => {
//     setBoardData(nextData);
//   };
//
//   const onCloseAddCard = () => {
//     setAddCardOpen(false);
//   };
//
//   const onClickAddCard = (list: CardListObj) => {
//     setList(boardData.lanes!.find((item) => item.id === list.id));
//     setSelectedCard(null);
//     setAddCardOpen(true);
//   };
//
//   const onAddList = (name: string) => {
//     dispatch(onAddNewList(boardDetail.id, { id: -1, name, cards: [] }));
//   };
//
//   const getCardById = (lane: CardListObj, cardId: number) =>
//     lane.cards.find((item) => item.id === cardId);
//
//   const onEditCardDetail = (cardId: number) => {
//     const selectedList = boardData.lanes!.find((item) => {
//       const correctCard = item.cards.find((card) => card.id === cardId);
//       if (correctCard) return item;
//       return undefined;
//     });
//     const selectedCard = getCardById(selectedList, cardId);
//     setSelectedCard(selectedCard);
//     setList(selectedList);
//     setAddCardOpen(true);
//   };
//
//   const handleDragCard = (
//     cardId,
//     sourceLaneId,
//     targetLaneId,
//     position,
//     cardDetails
//   ) => {
//     if (sourceLaneId !== targetLaneId) {
//       const boardId = boardDetail.id;
//       dispatch(
//         onUpdateCardCategory(
//           cardDetails.id,
//           sourceLaneId,
//           targetLaneId,
//           position,
//           boardId
//         )
//       );
//     }
//   };
//
//   return (
//     <AppsContent
//       sx={{
//         flex: 1,
//         "& .simplebar-wrapper": {
//           my: "0 !important",
//           height: "100%",
//         },
//         "& .simplebar-content": {
//           height: "100%",
//           maxHeight: "100%",
//           py: "0 !important",
//         },
//       }}>
//       <Board
//         laneStyle={{
//           borderRadius: 16,
//           maxHeight: "98%",
//           backgroundColor: theme.palette.background.default,
//           width: 350,
//         }}
//         editable
//         canAddLanes
//         data={boardData}
//         onDataChange={shouldReceiveNewData}
//         handleDragEnd={handleDragCard}
//         onCardAdd={(card, laneId) => {
//           onClickAddCard(laneId);
//         }}
//         onCardClick={(cardId, metadata, laneId) => {
//           onEditCardDetail(cardId, laneId);
//         }}
//         onLaneAdd={(name) => onAddList(name)}
//         onLaneUpdate={(laneId, data) => {
//           const lane = boardData.lanes.find((item) => item.id === laneId);
//           dispatch(
//             onEditBoardList(boardDetail.id, { ...lane, name: data.title })
//           );
//         }}
//         onLaneDelete={(laneId) =>
//           dispatch(onDeleteSelectedList(boardDetail.id, laneId))
//         }
//         t={(listId) => onClickAddCard(listId)}
//         components={{
//           BoardWrapper: BoardWrapper,
//           Card: CardDetail,
//           LaneHeader: ListHeader,
//           AddCardLink: AddCardButton,
//           NewCardForm: AddCard,
//           NewLaneForm: AddNewList,
//           NewLaneSection: NewListButton,
//         }}
//       />
//       <AddCard
//         isAddCardOpen={isAddCardOpen}
//         onCloseAddCard={onCloseAddCard}
//         list={list}
//         board={boardDetail}
//         selectedCard={selectedCard}
//         setSelectedCard={setSelectedCard}
//       />
//     </AppsContent>
//   );
// };
//
// export default BoardDetailView;
import React from 'react';

const BoardDetailView = () => {
  return <div>BoardDetailView</div>;
};

export default BoardDetailView;
