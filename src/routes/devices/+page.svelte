<script lang="ts">
  import Datatable from "$lib/components/table/Datatable.svelte";

  let { data } = $props();

  console.log(data.devices)
</script>

<h1 class="h1">Devices</h1>

<Datatable data={data.devices} selectBy="id" head={{
  name: {
    label: "Name",
    sortable: true
  },
  lastActivity: {
    label: "Last Activity"
  }
}}>
  {#snippet body(device)}
    <td>{device.name}</td>
    <td>{device.lastActivity?.toLocaleDateString() ?? '-'}</td>
  {/snippet}
</Datatable>