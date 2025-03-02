<script lang="ts">
  import "../app.css";
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import { Home, Settings } from "lucide-svelte";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<div class="flex h-full">
  <Navigation.Rail value={page.url.pathname}>
    {#snippet header()}
      <Navigation.Tile id="/" href="/" title="Dashboard">
        <Home/>
      </Navigation.Tile>
    {/snippet}
    {#snippet tiles()}
      <div></div>
    {/snippet}
    {#snippet footer()}
      <Navigation.Tile id="/settings" labelExpanded="Settings" href="/settings" title="Settings">
        <Settings/>
      </Navigation.Tile>
    {/snippet}
  </Navigation.Rail>

  <main class="p-4 h-full overflow-y-auto">
    {@render children()}
  </main>
</div>