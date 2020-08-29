import React from "react";
/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export default function createContext<A extends {} | null>() {
    const ctx = React.createContext<A | undefined>(undefined);
    function useContext() {
        const c = React.useContext(ctx);
        if (c === undefined)
            throw new Error("useContext must be inside a Provider with a value");
        return c;
    }
    return [useContext, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
} 