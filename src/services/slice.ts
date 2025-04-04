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
  isCodeValid: boolean;
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
  isCodeValid: false
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
    setIsCodeValid: (state, action: PayloadAction<boolean>) => {
      state.isCodeValid = action.payload
    }
  },
  selectors: {
    getRoleSelector: (state) => state.role,
    getPoliticSelector: (state) => state.politicSettings,
    getUserSelector: (state) => state.user,
    getIsCodeValid: (state) => state.isCodeValid
  },
});

export const { getRoleSelector, getPoliticSelector, getUserSelector, getIsCodeValid } = mainSlice.selectors;

export const {setUserAction, setRoleAction, setIsCodeValid} = mainSlice.actions;
