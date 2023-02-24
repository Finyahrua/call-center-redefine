import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function App() {
  const [file, setFile] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [userName, setUserName] = useState(null);
  const [district, setDistrict] = useState(null);
  const [region, setRegion] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setPhoneNumbers(json);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

  const handleNumberSelection = () => {
    const randomIndex = Math.floor(Math.random() * phoneNumbers.length);

    const selectedNumber = phoneNumbers[randomIndex].PHONE_NUMBER;
    const userName = phoneNumbers[randomIndex].BENEFICIARY_NAME;
    const district = phoneNumbers[randomIndex].DISTRICT;
    const region = phoneNumbers[randomIndex].REGION;

    setSelectedNumber(selectedNumber);
    setDistrict(district);
    setRegion(region);
    setUserName(userName);
    setPhoneNumbers(phoneNumbers.filter((_, index) => index !== randomIndex));
    console.log("phone number lenght", phoneNumbers.length);
  };

  return (
    <div className="font-poppins">
      <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 ">
            <img
              alt="Night"
              src="https://img.freepik.com/free-photo/office-worker-wheelchair-user-answering-landline-phone-call-having-remote-conversation-telephone-line-disability-friendly-office-man-with-chronic-impairment-using-telework-chat-line_482257-44030.jpg?w=740&t=st=1677247059~exp=1677247659~hmac=41113ec52ff94433469281a7eb2b1c743045dbcb1735c2367aca63a0e3392959"
              class="absolute inset-0 h-full w-full object-cover opacity-90 "
            />
            <div className="absolute h-full w-full object-cover bg-blue-800 opacity-40 "></div>

            <div class="hidden lg:relative lg:block lg:p-12">
              <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                <a
                  class="inline-flex items-center px-2 py-2 justify-center rounded-md bg-white"
                  href="/"
                >
                  <img
                    src="https://redefine.co.tz/wp-content/uploads/2020/10/logo2.png"
                    alt=""
                    className="h-8  flex-shrink-0 self-center bg-cover bg-center "
                  />
                </a>
              </h2>
              <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Redefine
              </h2>
              <p class="mt-4 leading-relaxed text-white/90">
                Through evidence and innovative approaches, we help our clients
                make lasting improvements to their performance and realize their
                most important goals
              </p>
            </div>
          </section>

          <main
            aria-label="Main"
            class="flex items-center justify-center px-2 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div class="max-w-5xl lg:w-full">
              <div class="relative -mt-16 block lg:hidden">
                <a
                  class="inline-flex h-16  items-center justify-center rounded-md bg-white"
                  href="/"
                >
                  <img
                    src="https://redefine.co.tz/wp-content/uploads/2020/10/logo2.png"
                    alt=""
                    className="h-8 px-4  flex-shrink-0 self-center bg-cover bg-center mb-4"
                  />
                </a>

                <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Redefine
                </h1>

                <p class="mt-4 leading-relaxed text-gray-500 mb-2">
                  Through evidence and innovative approaches, we help our
                  clients make lasting improvements to their performance and
                  realize their most important goals
                </p>
              </div>
              <fieldset className="w-full space-y-1 dark:text-gray-100 ">
                <label for="files" className="block text-lg font-medium py-4">
                  Upload the Phone numbers List
                </label>
                <div className="flex">
                  <input
                    type="file"
                    name="files"
                    id="files"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                    className="px-8 py-12 border border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 mb-2"
                  />
                </div>
              </fieldset>
              <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full whitespace-no-wrap">
                    <thead>
                      <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-blue-100 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Region</th>
                        <th class="px-4 py-3">District</th>
                        <th class="px-4 py-3">Phone No.</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      <tr class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold">{userName}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{region}</td>
                        <td class="px-4 py-3 text-sm"> {district}</td>

                        <td class="px-4 py-3 text-sm">{selectedNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <form action="#" class="mt-8 grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    onClick={handleNumberSelection}
                    disabled={!phoneNumbers.length}
                    class="inline-block shrink-0 rounded-md border border-blue-800 bg-blue-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Select Random Number
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default App;
