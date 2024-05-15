import { SemaphoreSubgraph } from "@semaphore-protocol/data"
import { Group } from "@semaphore-protocol/group"

const semaphoreSubgraph = new SemaphoreSubgraph("sepolia")

const { members } = await semaphoreSubgraph.getGroup("42", { members: true })

const group = new Group(members)
