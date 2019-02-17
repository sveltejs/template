import App from './App.html';

const app = new App({
	target: document.querySelector('main'),
	data: {
		name: 'world'
	}
});

// change the data associated with the template
app.set({ name: 'everybody' });

// detach the component and clean everything up
// commented out for example's sake - or you wouldn't see anything!
// app.destroy();