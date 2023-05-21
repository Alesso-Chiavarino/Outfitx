import { Command } from 'commander'

const program = new Command()

program.requiredOption('-p, --port <port>', 'set server port', 8080)
program.option('-m, --mode <mode>', 'set server mode', 'development', 'production')

program.parse()

export const args = program.opts()

console.log('Options: ', args);
console.log('Remaining', program.args);