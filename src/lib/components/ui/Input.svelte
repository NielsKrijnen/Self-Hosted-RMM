<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let props: HTMLInputAttributes = $props();
</script>

<input type="text" {...props} class={["input", props.class]}/>