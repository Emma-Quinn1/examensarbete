export type Pet = {
  _id: string;
  name: string;
  description: string;
  age: number;
  uid: string;
  location: string;
  type: string;
  breed: string;
  imageUrl: string;
  path: string;
};

export type NewPet = Omit<Pet, "_id" | "imageUrl" | "imagePath">;
