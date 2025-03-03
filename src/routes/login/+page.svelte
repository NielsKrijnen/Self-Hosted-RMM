<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input } from "$lib/components/ui";

  let { data } = $props();
</script>

{#if data.register}
  <h1 class="h1">Set up the first account</h1>
{:else}
  <h1 class="h1">Login</h1>
{/if}

<form action={data.register ? "?/register" : "?/login"} method="POST" use:enhance>
  <Input type="email" name="email" required/>
  <Input type="password" name="password" required/>
  <Button type="submit">
    {#if data.register}
      Register
    {:else}
      Login
    {/if}
  </Button>
</form>