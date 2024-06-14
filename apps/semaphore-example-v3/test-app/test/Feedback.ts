import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof } from "@semaphore-protocol/proof"
import { expect } from "chai"
import { formatBytes32String } from "ethers/lib/utils"
import { run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { Feedback } from "../build/typechain"
import { config } from "../package.json"

describe("Feedback", () => {
    let feedbackContract: Feedback
    let semaphoreContract: string

    const groupId = "42"
    const group = new Group(groupId)
    const users: Identity[] = []

    before(async () => {
        const { semaphore } = await run("deploy:semaphore", {
            logs: false
        })

        feedbackContract = await run("deploy", { logs: false, group: groupId, semaphore: semaphore.address })
        semaphoreContract = semaphore

        users.push(new Identity())
        users.push(new Identity())
    })

    describe("# joinGroup", () => {
        it("Should allow users to join the group", async () => {
            for await (const [i, user] of users.entries()) {
                const transaction = feedbackContract.joinGroup(user.commitment)

                group.addMember(user.commitment)

                await expect(transaction)
                    .to.emit(semaphoreContract, "MemberAdded")
                    .withArgs(groupId, i, user.commitment, group.root)
            }
        })
    })

    describe("# sendFeedback", () => {
        const wasmFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.wasm`
        const zkeyFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.zkey`

        it("Should allow users to send feedback anonymously", async () => {
            const feedback = formatBytes32String("Hello World")

            const fullProof = await generateProof(users[1], group, groupId, feedback, {
                wasmFilePath,
                zkeyFilePath
            })
console.log(fullProof.nullifierHash);

            const transaction = feedbackContract.sendFeedback(
                feedback,
                fullProof.merkleTreeRoot,
                fullProof.nullifierHash,
                groupId,
                fullProof.proof
            )

            await expect(transaction)
                .to.emit(semaphoreContract, "ProofVerified")
                .withArgs(groupId, fullProof.merkleTreeRoot, fullProof.nullifierHash, groupId, fullProof.signal)


            const feedback2 = formatBytes32String("Hello World 1")

            const fullProof2 = await generateProof(users[1], group, 2, feedback2, {
                wasmFilePath,
                zkeyFilePath
            })
console.log(fullProof2.nullifierHash);
            const transaction2 = await feedbackContract.sendFeedback(
                feedback2,
                fullProof2.merkleTreeRoot,
                fullProof2.nullifierHash,
                2,
                fullProof2.proof
            )
            console.log(transaction2);
        })
    })
})
