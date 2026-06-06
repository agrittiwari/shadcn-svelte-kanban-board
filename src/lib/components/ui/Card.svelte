<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils';

  type Props = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
  };

  let { children, class: className = '', ...restProps }: Props = $props();
</script>

<div
  {...restProps}
  class={cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm', className)}
>
  {@render children?.()}
</div>
