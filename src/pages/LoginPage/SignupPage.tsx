import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "./styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";
import { framer_transition } from "./styles/SigninPage.styled";

function SignupPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [clickable, setClickable] = useState(false);
  const [formData, setFormData] = useState({})

  const handleNextClick = (data: any) => {
    setClickable(true);
    setCurrentCard(currentCard + 1);
	setFormData({...formData, ...data})
  };
  const handlePreviousClick = (data: any) => {
    setClickable(true);
    setCurrentCard(currentCard - 1);
	setFormData({...formData, ...data})
  };
  const handleAnimationComplete = () => {
    setClickable(false);
  };
  const handleSubmit = (data: any) => {
	data = {...formData, ...data}
	console.log(data)
  }

  return (
    <PageContainer>
      <AnimatePresence 
	  	onExitComplete={handleAnimationComplete} 
		mode={'popLayout'} 
		initial={false}>
        {currentCard === 0 && (
          <motion.div
            key={currentCard}
            {...framer_transition}
            style={{ pointerEvents: clickable ? "none" : "auto" }}>
            <SignupCard onSubmit={handleNextClick} values={formData}/>
          </motion.div>
        )}
        {currentCard === 1 && (
          <motion.div
			key={currentCard}
			{...framer_transition}
            style={{ pointerEvents: clickable ? "none" : "auto" }}>
            <SignupDetailsCard 
				values={formData}
				onPrev={handlePreviousClick} 
				onSubmit={handleSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

export default SignupPage;
