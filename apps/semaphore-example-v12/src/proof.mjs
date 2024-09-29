import { generateProof } from "@semaphore-protocol/proof"

const scope = group.root
const message = 1

const proof = await generateProof(identity, group, message, scope)
