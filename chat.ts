import {
	WebSocket,
	isWebSocketCloseEvent,
} from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
	if (!message) return;
	const msg = senderId ? `[${senderId}]: ${message}` : message;
	for (const user of users.values()) {
		user.send(msg);
	}
	console.log(msg);
}

export async function chat(ws: WebSocket): Promise<void> {
	const userId = v4.generate();
	users.set(userId, ws);
	broadcast(`> User with the id ${userId} is connected.`);
	for await (const event of ws) {
		const message = typeof event === 'string' ? event : '';
		broadcast(message, userId);
		if (!message && isWebSocketCloseEvent(event)) {
			users.delete(userId);
			broadcast(`> User with the id ${userId} is disconnected.`);
			break;
		}
	}
}
