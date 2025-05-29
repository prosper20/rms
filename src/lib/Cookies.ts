export function ClearCookies(name: string) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getCookie(name: string) {
	const cookieArr = document.cookie.split(";");

	for (let i = 0; i < cookieArr.length; i++) {
		const cookie = cookieArr[i].trim();

		// Check if this cookie starts with the name we want
		if (cookie.indexOf(name + "=") == 0) {
			return cookie.substring(name.length + 1);
		}
	}
}
