# Understanding the code mask

## What this is for

The **mask** field on a System Type is the *template* the application uses to generate a new system code. Every time a user clicks *Generate* on the system code field in the [System Hierarchy](../../systemHierarchy/README.md) detail page, the server picks the assigned type, reads its mask, substitutes the tokens with values from the current context (zone, location, parent, etc.), and returns the resulting string.

This workflow explains what the tokens mean, what the default looks like, and how to plan custom masks safely. The mask is set per-type in [Managing System Types](./managing-types.md); this page focuses on the template syntax itself.

## Who can do this

🛡️ **Type Editor / Admin** — editing the mask requires `system-types-edit`. Reading it is available to anyone with `system-types-view`.

The *generated code* it produces is consumed in the [System Hierarchy](../../systemHierarchy/README.md) detail page, where any user with `systems-view` will see it on a system.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have read [Managing System Types](./managing-types.md) and understand where the mask is set.
- You understand the broader system code is a stable identifier — see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) for how generated codes are used.

## The mask template

The mask is a string with embedded tokens in curly braces. Tokens are substituted; everything else (separators, literals) is kept verbatim.

**Default mask:**

```
{STC}{ZC}-{serial(3)}
```

This reads: the System Type Code, then the Zone Code, a hyphen, then a 3-digit zero-padded serial number. With a type code of `ION`, a zone code of `B`, and the next serial number 7, it generates `IONB-007`.

### Tokens

| Token | Substituted with | Example |
|---|---|---|
| `{STC}` | **System Type Code** — the *code* field on the assigned System Type. Defined in this module on the type itself. | `ION` |
| `{ZC}` | **Zone Code** — the code of the system's assigned zone (from the Zones codebook). Empty if no zone is set. | `B` |
| `{serial(N)}` | **Sequential number, zero-padded to N digits.** The next available serial for this combination of `{STC}` and `{ZC}` (the server tracks per-prefix counters). Use `{serial(3)}` for three-digit padding, `{serial(4)}` for four-digit, etc. | `007` |

**Static text** between tokens is preserved verbatim. The default mask's hyphen is a static separator; any character that is not part of a `{...}` token stays as is.

### What the mask does *not* know

- The system's parent in the hierarchy (`HAS_SUBSYSTEM`). The mask is per-type, not per-position.
- The system's *level* (`SYSTEM_DOMAIN` … `TRASH`). Codes do not encode level.
- The catalogue item assigned. Codes are system-level, not item-level.

## When (and how) generation runs

Generation is *triggered manually* from the system's detail page — it does not happen automatically on system creation. The user (with `systems-edit`) clicks *Generate* next to the *System Code* field. The server:

1. Reads the system's currently assigned **system type** (and therefore its mask).
2. Reads the system's currently assigned **zone**.
3. Asks the counter for the next serial for the resulting `{STC}{ZC}` prefix.
4. Substitutes and returns the candidate code, which is then saved to the system record.

If the system has no type yet, or no zone (and the mask uses `{ZC}`), generation fails with a clear error toast in the detail page — assign the missing values first.

`[SCREENSHOT PLACEHOLDER: System Type edit dialog open with Mask field highlighted, showing the default template; below in a callout: a worked example of substitution producing IONB-007]`

## Customising the mask

Edit the *Mask* field in [Managing System Types](./managing-types.md). Some patterns that work:

- **Add a literal prefix.** `FAC-{STC}{ZC}-{serial(3)}` produces `FAC-IONB-007`.
- **Drop the zone.** `{STC}-{serial(4)}` produces `ION-0007`. Useful for type families where zone is not a meaningful disambiguator.
- **Wider serial.** `{STC}{ZC}-{serial(5)}` reserves five digits per prefix (`IONB-00007`).

Whichever pattern you pick, **commit to it before generating codes in the wild**. Changing the mask after live use produces an inconsistency: pre-existing systems keep their old generated codes; new ones get the new format.

## What gets changed when you edit a mask

**✅ Affected:**
- The next *Generate* on a system assigned this type will use the new mask.
- Reports / exports that group by code prefix will show a mix of old and new formats after a mask change.

**❌ Not affected:**
- Existing systems already assigned a code. Codes are stored on the system, not re-derived from the mask on every render.

## Limitations

- **No live preview.** The mask field shows the template string; the actual generated example is only visible after pressing *Generate* on a real system. (A preview is on the roadmap.)
- **No custom tokens.** The token set is fixed (`{STC}`, `{ZC}`, `{serial(N)}`). Other system fields (level, parent, attribute) cannot be substituted into the mask today.
- **Uniqueness is enforced per prefix.** The serial counter is keyed on the substituted prefix, not on the whole template. Two types sharing a prefix would share the counter — pick distinct codes.
- **Empty zone caveat.** If the mask uses `{ZC}` and the system has no zone, generation refuses. Either assign a zone first or use a mask that does not include `{ZC}` for types that legitimately ship without a zone.

## Tips & gotchas

- **Default works for most types.** Customise the mask only when there is a real downstream reason (an existing physical labelling scheme, an export format consumed by another system, etc.).
- **Plan zero-padding for growth.** Three digits cover the first 999 systems per `{STC}{ZC}` prefix; if you expect more, use `{serial(4)}` from the start.
- **Test on a throwaway system before adopting a custom mask.** Assign the type to a sandbox system in a non-production area, generate the code, confirm the result reads cleanly, then roll out.
- **Document custom masks externally if they encode meaning.** The mask itself is not self-documenting — `{STC}-{serial(5)}` does not say *why* zone was dropped. Note the rationale in the team's runbook.

## Related

- [Managing System Types](./managing-types.md)
- [Managing System Type Groups](./managing-groups.md)
- Triggering generation on a system → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- Zone codes → see *Zones* in the [user guide index](../../README.md).
