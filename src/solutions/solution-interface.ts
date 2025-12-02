export interface SolutionInterface {

    getPart1(): string;

    getPart2(): string;

}

export interface SolutionInterfaceConstructor {
    new(inputPath: string): SolutionInterface;
}