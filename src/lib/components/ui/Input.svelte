<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils';

  type Props = HTMLInputAttributes & {
    value?: string;
  };

  let {
    class: className = '',
    placeholder = '',
    type = 'text',
    value = $bindable(''),
    ...restProps
  }: Props = $props();
</script>

<input
  {...restProps}
  bind:value
  {placeholder}
  {type}
  class={cn(
    'flex h-9 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
    className,
  )}
/>
