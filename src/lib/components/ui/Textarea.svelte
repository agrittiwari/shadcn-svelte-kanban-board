<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils';

  type Props = HTMLTextareaAttributes & {
    value?: string;
  };

  let {
    class: className = '',
    placeholder = '',
    rows = 3,
    value = $bindable(''),
    ...restProps
  }: Props = $props();
</script>

<textarea
  {...restProps}
  bind:value
  {placeholder}
  {rows}
  class={cn(
    'flex min-h-20 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
    className,
  )}
></textarea>
