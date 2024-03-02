import React from "react";
interface Type {
  favIds: Array<any>;
  setFavId: Function;
  user: any;
  setUser: Function;
  username: any;
  setUsername: Function;
  verified: any;
  setVerify: Function;
  age: any;
  setAge: Function;
  location: any;
  setLocation: Function;
}

export const Context = React.createContext<Type>({
  favIds: [],
  setFavId: (id: any) => {},
  user: {},
  setUser: (user: any) => {},
  username: "",
  setUsername: (username: any) => {},
  verified: false,
  setVerify: (username: any) => {},
  age: "",
  setAge: (age: any) => {},
  location: "",
  setLocation: (location: any) => {},
});
