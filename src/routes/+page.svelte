<script>
  import { pushNotification } from "../stores/NotificationStore";

	const backendlink = import.meta.env.VITE_BACKEND_URL

	function handleClick() {
		// Example parameters - these should be determined by your app's logic
		const message = "A success message! Wooohoooo!";
		const alertType = "success";
		const manualClose = true;
		const duration = 5000;

		pushNotification(message, alertType, manualClose, duration);
	}
	function handleError() {
		// Example parameters - these should be determined by your app's logic
		const message = "Error occurred! :(";
		const alertType = "error";
		const manualClose = false;
		const duration = 5000;

		pushNotification(message, alertType, manualClose, duration);
	}
	function handleNeu() {
		// Example parameters - these should be determined by your app's logic
		const message = "Neutral information.";
		const alertType = "neutral";
		const manualClose = true;
		const duration = 5000;

		pushNotification(message, alertType, manualClose, duration);
	}
	function handleWarn() {
		// Example parameters - these should be determined by your app's logic
		const message = "Warning!";
		const alertType = "warning";
		const manualClose = false;
		const duration = 5000;

		pushNotification(message, alertType, manualClose, duration);
	}
</script>

<p>All set! <br> We have also set up push notifications for you! <br> Here are some examples...</p>
<br>
<button on:click={handleClick}>Good Notification</button>
<button on:click={handleError}>Error Notification</button>
<button on:click={handleNeu}>Neutral Notificaiton</button>
<button on:click={handleWarn}>Warning Notificaiton</button>

<br><br>
<p>Reminder to download and set up the backend! View the repo's README for more information!</p>
