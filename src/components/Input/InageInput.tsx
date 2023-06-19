import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Image } from "./styles/Input.styled";

interface ImageInputProps {
	id: string;
	px: number;
	defaultSrc: string;
	name?: string;
}
export const ImageInput = ({ id, px, defaultSrc, name = id}: ImageInputProps) => {
	const { control, setValue, getValues } = useFormContext();
	const [imageFile, setImageFile] = useState<File | null>(getValues(name) || null);
  
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const file = event.target.files?.[0];
	  if (file) {
		setImageFile(file);
		setValue(name, file);
	  }
	};
  
	return (
	  <>
		<Controller
		  name={name}
		  control={control}
		  defaultValue={null}
		  render={() => (
			<input
			  id={id}
			  type="file"
			  accept="image/*"
			  style={{ display: 'none' }}
			  onChange={handleImageChange}
			/>
		  )}
		/>
		<label htmlFor={id}>
		  <Image src={imageFile ? URL.createObjectURL(imageFile) : defaultSrc} px={px} />
		</label>
	  </>
	);
};

