import { providers } from "ethers";

/**
 *
 * @returns BaseProvider
 */

export const provider = providers.getDefaultProvider("kovan", {
    infura: "https://kovan.infura.io/v3/9f476913766e460687713579accce17e",
    pocket: {
        applicationId: "60fc0cf42a9c8f00340ceec9",
        applicationSecretKey: "0fb0dd8f92758cb713c653e4aac5fbb6"
    }
});
