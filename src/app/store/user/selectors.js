import { createSelector } from "@reduxjs/toolkit";

const getUser = (state) => state.user;

export const selectUser = createSelector(getUser, (user) => user);
