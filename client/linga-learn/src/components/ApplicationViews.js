import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import { LanguageProvider } from "../providers/LanguageProvider.js";
import { LanguageProficiencyProvider } from "../providers/LanguageProficiencyProvider.js";
import { FlashcardCollectionProvider } from "../providers/FlashcardCollectionProvider.js";
import { FlashcardProvider } from "../providers/FlashcardProvider.js";

import LanguageList from "./Languages/LanguageList.js";
import LanguageAdd from "./Languages/LanguageAdd.js";
import LanguageManage from "./Languages/LanguageManage.js";
import FlashcardCollectionList from "./FlashcardCollections/FlashcardCollectionList";
import FlashcardCollectionAndFlashcardAdd from "./FlashcardCollections/FlashcardCollectionAndFlashcardAdd.js";
import FlashcardCollectionDeletionConfirmation from "./FlashcardCollections/FlashcardDeletionConfirmation.js";
import FlashcardList from "./Flashcards/FlashcardList.js";
import FlashcardEdit from "./Flashcards/FlashcardEdit.js";



export default function ApplicationViews() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>

            <Route path="/" exact>
                <LanguageProvider>
                    <LanguageProficiencyProvider>
                        {isLoggedIn ? <LanguageList /> : <Redirect to="/login" />}
                    </LanguageProficiencyProvider>
                </LanguageProvider>
            </Route>


            <Route path="/AddLanguage" exact>
                <LanguageProvider>
                    <LanguageProficiencyProvider>
                        {isLoggedIn ? <LanguageAdd /> : <Redirect to="/login" />}
                    </LanguageProficiencyProvider>
                </LanguageProvider>
            </Route>


            <Route path="/Manage" exact>
                <LanguageProvider>
                    <LanguageProficiencyProvider>
                        {isLoggedIn ? <LanguageManage /> : <Redirect to="/login" />}
                    </LanguageProficiencyProvider>
                </LanguageProvider>
            </Route>


            <Route path="/FlashcardCollectionList" >
                <FlashcardCollectionProvider>
                    <LanguageProvider>
                        {isLoggedIn ? <FlashcardCollectionList /> : <Redirect to="/login" />}
                    </LanguageProvider>
                </FlashcardCollectionProvider>
            </Route>


            <Route path="/FlashcardList/:FlashcardCollectionId(\d+)" >
                <FlashcardProvider>
                    {isLoggedIn ? <FlashcardList /> : <Redirect to="/login" />}
                </FlashcardProvider>
            </Route>

            <Route path="/AddFlashcardCollectionAndFlashcards" >
                <FlashcardCollectionProvider>
                    <FlashcardProvider>
                        <LanguageProvider>
                            {isLoggedIn ? <FlashcardCollectionAndFlashcardAdd /> : <Redirect to="/login" />}
                        </LanguageProvider>
                    </FlashcardProvider>
                </FlashcardCollectionProvider>
            </Route>

            <Route path="/Delete/:FlashcardCollectionId(\d+)" >
                <FlashcardCollectionProvider>
                    <FlashcardProvider>
                        <LanguageProvider>
                            {isLoggedIn ? <FlashcardCollectionDeletionConfirmation /> : <Redirect to="/login" />}
                        </LanguageProvider>
                    </FlashcardProvider>
                </FlashcardCollectionProvider>
            </Route>

            <Route path="/Manage/:FlashcardId(\d+)">
                <FlashcardCollectionProvider>
                    <FlashcardProvider>
                        <LanguageProvider>
                            {isLoggedIn ? <FlashcardEdit /> : <Redirect to="/login" />}
                        </LanguageProvider>
                    </FlashcardProvider>
                </FlashcardCollectionProvider>
            </Route>




        </main>
    );
};