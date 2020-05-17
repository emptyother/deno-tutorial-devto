# Deno Tutorial Notes

A sample application for [Deno][deno], with VSCode debugging. Based on a [dev.to
tutorial][tut].

## Useful commands

### Download references/packages without running the application

If VSCode complains about missing references after adding a module, much like
`npm install` you can download the referenced packages:

```bash
deno cache <file.ts>
```

## Notes

Cant turn `index.html`'s javascript code into a separate file without getting
errors. Need multiple workspaces? Or a precompile step?

## Problemshooting Deno

### Error: Property 'utime' does not exist on type 'typeof Deno'

**Solution:** Use the flag `--unstable` when running Deno. [Source][gh1].

### VSCode's debug console doesnt show console.log output

Unsolved.

[deno]: https://deno.land/
[tut]:
	https://dev.to/aralroca/learn-deno-chat-app-37f0?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email
[gh1]: https://github.com/denoland/deno/issues/5175
