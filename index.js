const fs = require("fs");
let request = require("request-promise");
const cookieJar = request.jar();
request = request.defaults({ jar: cookieJar });

async function main() {
  const result = await request.get("https://internshala.com/");
  const cookieString = cookieJar.getCookieString("https://internshala.com/");
  const splittedByCsrfCookieName = cookieString.split("csrf_cookie_name=");
  const csrf_test_name = splittedByCsrfCookieName[1].split(";")[0];

  const loginResult = await request.post(
    "https://internshala.com/login/verify_ajax/user",
    {
      form: {
        csrf_test_name,
        email: "stefanhyltoft@gmail.com",
        password: "qik%40I*G34xXK",
      },
    }
  );
  const matches = await request.get(
    "https://internshala.com/internships/matching-preferences"
  );
  fs.writeFileSync("./matches.html", matches);
  console.log(loginResult);
}

main();
