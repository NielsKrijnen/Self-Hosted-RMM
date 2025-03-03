<script lang="ts" generics="T extends Record<string, any>">
  import { Pagination, RowCount, TableHandler } from "@vincjo/datatables/server";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import type { Snippet } from "svelte";
  import { Input } from "$lib/components/ui";

  let { data, head, body, selectBy, selected }: {
    data: T[]
    head: Partial<Record<keyof T, {
      label: string,
      sortable?: boolean
    }>>
    body: Snippet<[T]>
    selectBy?: keyof T
    selected?: Snippet<[T[keyof T][], boolean]>
    sortable?: (keyof T)[]
  } = $props();

  const table = new TableHandler(data, { rowsPerPage: 5, totalRows: 500, selectBy })

  table.load(async state => {
    if (browser) {
      const url = new URL(page.url)
      url.searchParams.forEach((_, key) => {
        url.searchParams.delete(key)
      })

      url.searchParams.delete("asc")
      url.searchParams.delete("desc")
      if (state.sort) {
        url.searchParams.set(state.sort.direction ?? "asc", state.sort.field as string ?? "")
      }

      await goto(url)
    }
    return data
  })

  table.invalidate()
</script>

<div class="table-wrap">
  <header>
    {#if selectBy && selected}
      {@render selected(table.selected, table.isAllSelected)}
    {/if}
  </header>
  <table class="table">
    <thead>
    <tr>
      {#if selectBy}
        <td>
          <Input type="checkbox" class="size-6" checked={table.isAllSelected} onclick={() => table.selectAll()}/>
        </td>
      {/if}
      {#each Object.keys(head) as key}
        {#if head[key]}
          <th>
            {#if head[key].sortable}
              {@const sort = table.createSort(key)}
              <button onclick={() => sort.set()} type="button">
                {head[key].label}
              </button>
            {:else}
              {head[key].label}
            {/if}
          </th>
        {/if}
      {/each}
    </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
    {#each table.rows as row}
      <tr>
        {#if selectBy}
          <td>
            <Input type="checkbox" class="size-6"
                   checked={table.selected.includes(row[selectBy])}
                   onclick={() => table.select(row[selectBy])}
            />
          </td>
        {/if}
        {@render body(row)}
      </tr>
    {/each}
    </tbody>
  </table>
  <footer class="flex justify-between">
    <RowCount {table}/>
    <Pagination {table}/>
  </footer>
</div>