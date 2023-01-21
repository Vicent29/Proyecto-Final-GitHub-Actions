const core = require("@actions/core");

//Variables mailgun crear formulario
var API_KEY_MAILGUN = core.getInput('resultado_cypress');
var DOMAIN_MAILGUN = core.getInput('resultado_cypress');
let DESTINATARIO = process.env.destinatario
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: API_KEY_MAILGUN });

//Variables de estado de los jobs
let result_linter_job = core.getInput('result_linter_job');
let resultado_cypress = core.getInput('result_cypress_job');
let result_add_badge_job = core.getInput('result_add_badge_job');
let result_deploy_job = core.getInput('result_deploy_job');

const asunto= "Resultado del workflow ejecutado"

const body = `
    <div>
        <p>Se ha realizado un push en la rama master que ha provocado la ejecución del
            workflow GithubActions_Final con los siguientes resultados:</p>
        <ul>
            <li>
                linter_job: ${result_linter_job}
            </li>
            <li>
                cypress_job: ${resultado_cypress}
            </li>
            <li>
                add_badge_job: ${result_add_badge_job}
            </li>
            <li>
                deploy_job: ${result_deploy_job}
            </li>
        </ul>
    </div>`;

mg.messages.create(DOMAIN_MAILGUN, {
    from: "esteve.ferre.vicent@gmail.com",
    to: [DESTINATARIO],
    subject: asunto,
    html: body
})
    .then(msg => console.log(msg))
    .catch(err => console.error(err));