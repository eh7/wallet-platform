import { task, types } from "hardhat/config"

task("deploy", "Deploy YourContract  contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

        const FeedbackFactory = await ethers.getContractFactory("YourContract")

	const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, 0)
	//const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress)

        if (logs) {
            console.info(`Feedback contract has been deployed to: ${await feedbackContract.getAddress()}`)
        }

        return feedbackContract
    })
