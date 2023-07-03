import { useState, useEffect } from "react";
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
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	useEffect(() => {
		const newSrc = imageFile && URL.createObjectURL(imageFile);
		setImageSrc(newSrc)
		if (newSrc)
			return () => URL.revokeObjectURL(newSrc);
	}, [imageFile]);

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
		  <Image src={imageSrc || defaultSrc} px={px} />
		</label>
	  </>
	);
};

