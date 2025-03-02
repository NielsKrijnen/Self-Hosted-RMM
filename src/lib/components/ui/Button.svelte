<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let props: HTMLButtonAttributes = $props();
</script>

<button type="button" {...props} class={["btn preset-filled", props.class]}>
  {@render props.children?.()}
</button>