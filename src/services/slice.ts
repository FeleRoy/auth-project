import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface sliceState {
  politicSettings: {
    cyrillic: "SET" | "NOT_SET";
    latin: "SET" | "NOT_SET";
    numbers: "SET" | "NOT_SET";
    specialSymbols: "SET" | "NOT_SET";
    unique: "SET" | "NOT_SET";
    upperCase: "SET" | "NOT_SET";
    lowerCase: "SET" | "NOT_SET";
    countOfSymbols: number;
  };
  role: "ADMIN" | "USER";
  user: string;
}

const initialState: sliceState = {
  politicSettings: {
    cyrillic: "NOT_SET",
    latin: "NOT_SET",
    numbers: "NOT_SET",
    specialSymbols: "NOT_SET",
    unique: "NOT_SET",
    upperCase: "NOT_SET",
    lowerCase: "NOT_SET",
    countOfSymbols: 8,
  },
  role: "USER",
  user: "",
};

export const mainSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<string>) => {
        state.user = action.payload;
    },
    setRoleAction: (state, action: PayloadAction<"ADMIN" | "USER">) => {
        state.role = action.payload;
    },
  },
  selectors: {
    getRoleSelector: (state) => state.role,
    getPoliticSelector: (state) => state.politicSettings,
    getUserSelector: (state) => state.user,
  },
});

export const { getRoleSelector, getPoliticSelector, getUserSelector } = mainSlice.selectors;

export const {setUserAction, setRoleAction} = mainSlice.actions;
