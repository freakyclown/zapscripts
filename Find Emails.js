// Email finder by freakyclown@gmail.com
// Based on:
// PassiveHTMLCommentFinder.js
// kingthorin+owaspzap@gmail.com


function scan(ps, msg, src) {
    alertRisk = 0
    alertReliability = 3
    alertTitle = 'Email addresses (script)'
    alertDesc = 'Email addresses were found'
    alertSolution = 'Remove emails that are not public'

    cweId = 0
    wascId = 0
	// regex must appear within /( and )/g
    re = /([a-zA-Z0-9.#?$*_-]+@[a-zA-Z0-9.#?$*_-]+.[a-zA-Z0-9.-]+)/g

    url = msg.getRequestHeader().getURI().toString();

	// tell the user in the console we are doing stuff
    //println('Finding email addresses under ' + url);

    if (msg) {
        body = msg.getResponseBody().toString()
        if (re.test(body)) {
            re.lastIndex = 0 // After testing reset index
            // Look for email addresses
            var foundEmail = []
            while (comm = re.exec(body)) {
                foundEmail.push(comm[0]);
            }
            ps.raiseAlert(alertRisk, alertReliability, alertTitle, alertDesc, url, '', '', foundEmail.toString(), alertSolution, '', cweId, wascId, msg);
        }
    }
}
