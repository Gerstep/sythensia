import type { Message } from "./GameWindow";
import axios from "axios";

class AutonomousAgent {
  name: string;
  goal: string;
  tasks: string[] = [];
  isRunning = true;
  sendMessage: (message: Message) => void;
  shutdown: () => void;
  numLoops = 0;

  constructor(
    name: string,
    goal: string,
    addMessage: (message: Message) => void,
    shutdown: () => void
  ) {
    this.name = name;
    this.goal = goal;
    this.sendMessage = addMessage;
    this.shutdown = shutdown;
  }

  async run() {
    this.sendGoalMessage();
    this.sendThinkingMessage();

    console.log(`Loop ${this.numLoops}`);
    console.log(this.tasks);

    // Initialize by getting tasks
    try {
      this.tasks = await this.getInitialTasks();
      for (const task of this.tasks) {
        await new Promise((r) => setTimeout(r, 800));
        this.sendTaskMessage(task);
      }
    } catch (e) {
      console.log(e);
      this.sendErrorMessage(
        `ERROR retrieving initial tasks array. Shutting Down.`
      );
      this.shutdown();
      return;
    }
  }

  async advance(options) {
    this.sendAdvancingMessage();

    console.log(`Looping number ${this.numLoops}`);
    console.log('Advancing... with option' + options);
    console.log('goal: ' + this.goal);

    this.numLoops += 1;
    if (this.numLoops >= 10) {
      this.sendLoopMessage();
      this.shutdown();
      return;
    }

    try {
        const result = await this.getAdvancement(options);
        this.sendAdvancementMessage(options, result);

        // call getAdditionalTasks
        // pass goal + option + result
        // get 3 tasks

        console.log('GETTING MORE OPTIONS ' + result + ' CONTEXT: ' + this.goal)
        const newOptions = await this.getAdditionalOptions(
            this.goal,
            result
        )
        this.tasks = this.tasks.concat(newOptions);

        try {
            this.tasks = await this.getInitialTasks();
            for (const task of this.tasks) {
              await new Promise((r) => setTimeout(r, 800));
              this.sendTaskMessage(task);
            }
          } catch (e) {
            console.log(e);
            this.sendErrorMessage(
              `ERROR retrieving initial tasks array. Shutting Down.`
            );
            this.shutdown();
            return;
          }

      } catch (e) {
        console.log(e);
        this.sendErrorMessage(
          `ERROR retrieving initial tasks array. Shutting Down.`
        );
        this.shutdown();
        return;
      }
    
    // don't loop yet
    // await this.loop();
  }

  async loop() {
    console.log(`Loop ${this.numLoops}`);
    console.log(this.tasks);

    if (this.tasks.length === 0) {
      this.sendCompletedMessage();
      this.shutdown();
      return;
    }

    this.numLoops += 1;
    if (this.numLoops >= 10) {
      this.sendLoopMessage();
      this.shutdown();
      return;
    }

    if (!this.isRunning) {
      this.sendManualShutdownMessage();
      this.shutdown();
      return;
    }

    // Wait before starting
    await new Promise((r) => setTimeout(r, 1000));

    // Execute first task
    // Get and remove first task
    const currentTask = this.tasks.shift();
    this.sendThinkingMessage();

    const result = await this.executeTask(currentTask as string);
    this.sendExecutionMessage(currentTask as string, result);

    // Wait before adding tasks
    await new Promise((r) => setTimeout(r, 1000));
    this.sendThinkingMessage();

    // Add new tasks
    try {
      const newTasks = await this.getAdditionalTasks(
        currentTask as string,
        result
      );
      this.tasks = this.tasks.concat(newTasks);
      for (const task of newTasks) {
        await new Promise((r) => setTimeout(r, 800));
        this.sendTaskMessage(task);
      }

      if (newTasks.length == 0) {
        this.sendActionMessage("Task marked as complete!");
      }
    } catch (e) {
      console.log(e);
      this.sendErrorMessage(
        `ERROR adding additional task(s). It might have been against our model's policies to run them. Continuing.`
      );
      this.sendActionMessage("Task marked as complete.");
    }

    await this.loop();
  }

  async getInitialTasks(): Promise<string[]> {
    const res = await axios.post(`/api/chain`, { goal: this.goal });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data.tasks as string[];
  }

  async getAdvancement(options): Promise<string[]> {
    const res = await axios.post(`/api/advance`, { goal: this.goal, options: options });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data.response as string;
  }

  async getSummary(task): Promise<string> {
    const res = await axios.post(`/api/summarize`, { task: task });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data as string;
  }

  async getAdditionalTasks(
    currentTask: string,
    result: string
  ): Promise<string[]> {
    const res = await axios.post(`/api/create`, {
      goal: this.goal,
      tasks: this.tasks,
      lastTask: currentTask,
      result: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return res.data.tasks as string[];
  }

  async getAdditionalOptions(
    goal: string,
    result: string
  ): Promise<string[]> {
    const res = await axios.post(`/api/create`, {
      goal: this.goal,
      result: result
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return res.data.tasks as string[];
  }

  async executeTask(task: string): Promise<string> {
    const res = await axios.post(`/api/execute`, {
      goal: this.goal,
      task: task,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return res.data.response as string;
  }

  stopAgent() {
    this.isRunning = false;
  }

  sendGoalMessage() {
    this.sendMessage({ type: "goal", value: this.goal });
  }

  sendLoopMessage() {
    this.sendMessage({
      type: "system",
      value: `We're sorry, because this is a demo, we cannot have our agents running for too long. Shutting down.`,
    });
  }

  sendManualShutdownMessage() {
    this.sendMessage({
      type: "system",
      value: `The agent has been manually shutdown.`,
    });
  }

  sendCompletedMessage() {
    this.sendMessage({
      type: "system",
      value: "All tasks completed. Shutting down.",
    });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }

  sendAdvancingMessage() {
    this.sendMessage({ type: "advancing", value: "" });
  }

  async sendTaskMessage(task: string) {
    const summary = await this.getSummary(task as string)
    console.log('SUMMARY: ' + summary)
    // add quest summary
    this.sendMessage({ type: "task", value: task, summary: summary });
  }

  // async sendStoryMessage(task: string) {
  //   this.sendMessage({ type: "story", value: task });
  // }

  sendErrorMessage(error: string) {
    this.sendMessage({ type: "system", value: error });
  }

  sendExecutionMessage(task: string, execution: string) {
    this.sendMessage({
      type: "action",
      info: `Executing "${task}"`,
      value: execution,
    });
  }

  sendActionMessage(message: string) {
    this.sendMessage({
      type: "action",
      info: message,
      value: "",
    });
  }

  sendAdvancementMessage(options: string, result: string) {
    this.sendMessage({
      type: "action",
      info: options,
      value: result,
    });
  }
}

export default AutonomousAgent;