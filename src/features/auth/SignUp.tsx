import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  emailState,
  usernameState,
  passwordState,
} from '../../shared/components/atoms/authState';
import { SignUpPart1 } from './components/SignUpFirstInfo';
import { SignUpPart2 } from './components/SignUpPasswordInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SIGNUP_URL = `${import.meta.env.VITE_API_URL}/Auth/register`;

export function SignUp() {
  const [email, setEmail] = useRecoilState(emailState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [showPart2, setShowPart2] = useState(false);

  const handleNext = () => setShowPart2(true);

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Role', 'Admin');
    console.log(formData);

    try {
      const response = await axios.post(SIGNUP_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Sign up successful:', response.data);
      toast.success('Sign up successful!');
      // Handle successful sign up, e.g., redirect to login page
    } catch (error) {
      console.error('Sign up failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Sign up failed: ${error.response.data.message}`);
      } else {
        toast.error('Sign up failed. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-[#1e2c4f] rounded-[40px] p-8 space-y-6 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      {!showPart2 ? (
        <SignUpPart1 onNext={handleNext} />
      ) : (
        <SignUpPart2 onSignUp={handleSignUp} />
      )}
    </div>
  );
}
