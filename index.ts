import { listenAndServe } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { exists } from 'https://deno.land/std/fs/mod.ts';
import { chat } from './chat.ts';

listenAndServe({ port: 3000 }, async (req) => {
	if (req.method === 'GET' && req.url === '/') {
		req.respond({
			status: 200,
			headers: new Headers({
				'content-type': 'text/html',
			}),
			body: await Deno.open('./public/index.html'),
		});
		return;
	}

	if (req.method === 'GET' && req.url === '/ws') {
		if (acceptable(req)) {
			acceptWebSocket({
				conn: req.conn,
				bufReader: req.r,
				bufWriter: req.w,
				headers: req.headers,
			}).then(chat);
		}
		return;
	}

	const url = './public' + req.url;
	const fileExists = await exists(url);
	if (fileExists) {
		req.respond({
			status: 200,
			body: await Deno.open(url),
		});
	}
});
console.log('Server running on localhost:3000');
