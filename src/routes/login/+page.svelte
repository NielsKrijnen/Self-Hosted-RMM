<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input } from "$lib/components/ui";
</script>

<form method="POST" use:enhance>
  <Input type="email" name="email" required/>
  <Input type="password" name="password" required/>
  <Button type="submit">Login</Button>
</form>