const urlOverride = import.meta.env.VITE_FOUNDRY_URL;
const foundryUrl = urlOverride ?? window.location.origin;

const configuration = {
    foundryUrl: foundryUrl
};

export { configuration };