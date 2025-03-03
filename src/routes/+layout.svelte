<script lang="ts">
  import "../app.css";
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import { GaugeCircle, Laptop, Settings } from "lucide-svelte";
  import { page } from "$app/state";

  let { data, children } = $props();
</script>

<div class="flex h-full">
  {#if data.user}
    <Navigation.Rail value={page.url.pathname}>
      {#snippet tiles()}
        <Navigation.Tile id="/" href="/" title="Dashboard">
          <GaugeCircle/>
        </Navigation.Tile>
        <Navigation.Tile id="/devices" href="/devices" title="Devices">
          <Laptop/>
        </Navigation.Tile>
      {/snippet}
      {#snippet footer()}
        <Navigation.Tile id="/settings" labelExpanded="Settings" href="/settings" title="Settings">
          <Settings/>
        </Navigation.Tile>
      {/snippet}
    </Navigation.Rail>
  {/if}

  <main class="p-4 h-full w-full overflow-y-auto">
    {@render children()}
  </main>
</div>