export type Pet = {
  _id: string;
  name: string;
  description: string;
  age: number;
  uid: string;
  location: string;
  type: string;
  breed: string;
  imageUrls: string[];
  path: string;
  author: {
    uid: string;
    displayName: string;
    email: string;
  };
};

export type NewPet = Omit<Pet, "_id" | "imageUrls" | "imagePath">;
