import { task, types } from "hardhat/config"

task("deploy", "Deploy YourContract  contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .addOptionalParam("baseContract", "base contract to target", "YourContract", types.string)
    .setAction(async ({ logs, semaphore: semaphoreAddress, baseContract }, { ethers, run }) => {
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

	//const FeedbackFactory = await ethers.getContractFactory("YourContract")
        const FeedbackFactory = await ethers.getContractFactory(baseContract)

	const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, 0)
	//const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress)

        if (logs) {
            console.info(`Feedback contract has been deployed to: ${await feedbackContract.getAddress()}`)
        }

        return feedbackContract
    })
