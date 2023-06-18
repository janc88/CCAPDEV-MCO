export const framer_transition = {
	initial: 'hidden',
	animate: 'visible',
	exit: 'exit',
	variants: {
		hidden: { opacity: 0, x: -100 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 100 }
	},
	transition: {
		duration: 0.2
	}
  }