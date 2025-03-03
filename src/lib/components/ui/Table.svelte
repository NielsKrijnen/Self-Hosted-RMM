<script lang="ts">
  import type { Snippet } from "svelte";

  let { head, body }: { head: Snippet, body: Snippet } = $props();
</script>

<div class="table-wrap w-full">
  <table class="table w-full">
    <thead>
    <tr>
      {@render head()}
    </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
    {@render body()}
    </tbody>
  </table>
</div>