module.exports = (data) => {
  const today = new Date().toLocaleDateString();

  const checkedOptions = (options, type) => {
    return options
      .map((prod) => {
        if (prod === type) return "checked";
        else return "";
      })
      .join("");
  };

  // const getOrganization = (organizations) => {
  //   const organizationName = JSON.parse(organizations);
  //   return [organizationName[0]?.name];
  // };

  // const getLocation = (organizations, location) => {
  //   const organizationName = JSON.parse(organizations);
  //   const orgLocation = organizationName[0]?.niveau;
  //   return orgLocation === location ? "checked" : "";
  // };

  const getRequestType = (requestType, type) => {
    return requestType === type ? "checked" : "";
  };

  const getRequesterType = (requesterType, requester) => {
    return requesterType === requester ? ["checked", data?.cinNumber] : "";
  };

  const pdfTemplate = (organizations) => {
    const parcedOrgs = JSON.parse(organizations);
    return parcedOrgs
      .map((org) => {
        return `     
  <div class="container">
      <p class="text-color right-side-text">يتم الإذن بالمعالجة لدى اللجنة الوطنية لمر اقبة حماية المعطيات ذات الطابع الشخصي طبقا لمداولتها عدد: 191-Au-2019 بتاريخ 31/05/2019</p>
      <p class="text-color left-side-text">نموذج أعدته لجنة الحق في الحصول على المعلومات طبقا للمادة 15 من القانون 31.13 (متوفر في الموقع الإلكتروني للجنة:www.cdai.ma)</p>
      <div class="container-flex-between">
        <img
          class="image"
          src="https://www.cdai.ma/wp-content/uploads/2021/08/logo_CDAI.png"
        />
        <p class="top-title">طلب الحصول على المعلومات</p>
      </div>
      <hr />
      <div class="text-size-small container-flex-between">
        <div>
          <p style="margin: 2px">
            <span>الرقم الترتيبي لتسجيل الطلب:</span><span> ADIS-1-2022</span>
          </p>
          <p style="margin-bottom: 2px" class="border">
            <span>تاريخ تقديم الطلب:</span><span> ${today}</span>
          </p>
        </div>
        <div class="flex-items-start">
          <p style="margin: 2px 0 10px">طريقة التوصل بالطلب:</p>
          <div style="margin-top: -5px" class="flex-items-start border">
            <div>
              <input type="checkbox" />
              <label> الإيداع المباشر</label>
            </div>
            <div>
              <input type="checkbox" />
              <label> البريد العادي</label>
            </div>
            <div>
              <input type="checkbox" checked/>
              <label>البريد الإلكتروني </label>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-color section-title text-white">
        (1) المؤسسة أو الهيئة المعنية
      </div>
      <div class="text-size-small border">
        <p>
          <span> المؤسسة أو الهيئة الموجه إليها طلب الحصول على المعلومات:</span>
          <span> ${org.name}</span>
        </p>
        <p>
          <span> الكائنة ب:</span>
          <span></span>
        </p>
        <div style="width: 300px" class="container-flex-between">
          <div>
            <input type="checkbox" ${org.niveau === "0" ? "checked" : ""}/>
            <label>مركزية</label>
          </div>
          <div>
            <input type="checkbox" ${org.niveau === "1" ? "checked" : ""}/>
            <label>جهوية</label>
          </div>
          <div>
            <input type="checkbox" ${org.niveau === "2" ? "checked" : ""}/>
            <label>إقليمية</label>
          </div>
          <div>
            <input type="checkbox" ${org.niveau === "3" ? "checked" : ""}/>
            <label>محلية</label>
          </div>
        </div>
      </div>
      <div class="text-size-small border">
        <p>
          طبقا لمقتضيات المادة 14 من القانون 13.31 المتعلق بالحق في الحصول على
          المعلومات، أنا الموقع(ة) أسفله، الحامل للبيانات التالية (3) ،أرغب في
          الحصول على المعلومات المودعة لدى المؤسسة أو الهيأة المعنية المشار
          إليها في (1) وفق الطريقة المحددة أسفله (5).
        </p>
      </div>
      <div class="bg-color section-title text-white">(2) نوع الطلب</div>
      <div class="flex-items-start text-size-small border">
        <div style="width: 200px">
          <input type="checkbox" ${getRequestType(
            data.requestType,
            "normalRequest"
          )}/>
          <label>طلب عادي</label>
        </div>
        <div style="width: 200px">
          <input type="checkbox" ${getRequestType(
            data.requestType,
            "urgentRequest"
          )}/>
          <label>طلب استعجالي</label>
        </div>
      </div>
      <div class="bg-color section-title text-white">(3) بيانات شخصية</div>
      <div class="text-size-small personal-info border">
        <p><span>الإسم الشخصي:</span><span> ${data?.firstname}</span></p>
        <p><span>الإسم العائلي:</span><span> ${data?.lastname}</span></p>
        <p><span>العنوان الشخصي:</span><span> ${data?.address}</span></p>
        <p><span>البريد الإلكتروني:</span><span> ${data?.email}</span></p>
        <p><span>الهاتف:</span><span> ${data?.phone}</span></p>
      </div>
      <div class="bg-color section-title text-white">(4) صاحب(ة) الطلب</div>
      <div class="text-size-small border">
        <div>
          <input type="checkbox" ${
            getRequesterType(data?.requester, "citizin")[0]
          }/>
          <label>
            <span>مواطن(ة) مغربي(ة)،رقم البطاقة الوطنية للتعريف: </span>
            <span> ${
              !getRequesterType(data?.requester, "citizin")[1]
                ? ""
                : getRequesterType(data?.requester, "citizin")[1]
            }</span>
          </label>
        </div>
        <div style="margin-top: 5px">
          <input type="checkbox" ${
            getRequesterType(data?.requester, "foreigner")[0]
          }/>
          <label>
            <span>مقيم أجنبي، رقم وثيقة إثبات الإقامة بصفة قانونية:</span>
            <span> ${
              !getRequesterType(data?.requester, "foreigner")[1]
                ? ""
                : getRequesterType(data?.requester, "foreigner")[1]
            }</span>
          </label>
        </div>
      </div>
      <div class="bg-color section-title text-white">
        (5) المعلومات المطلوبة
      </div>
      <div style="padding: 2px 0 0" class="text-size-small requested-info border">
        <p style="min-height: 50px;"><span class="text-color">الموضوع:</span><span> ${
          data?.subject
        }</span></p>
        <p class="border-top">
          <span>الفترة الزمنية المعنية بالمعلومات المطلوبة: </span>
          <span>من</span><span> ${data?.from}</span>
          <span>إلى</span><span> ${data?.to}</span>
        </p>
        <div class="border-top flex-items-start">
          <p class="self-center">المعلومات المطلوبة مضمنة ب:</p>
          <div class="options-container">
            <div class="info-contain">
              <div style="width: 100px">
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "مستند"
                )}/>
                <label> مستند</label>
              </div>
              <div style="width: 110px">
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "تقرير"
                )}/>
                <label> تقرير</label>
              </div>
              <div>
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "دراسة"
                )}/>
                <label> دراسة</label>
              </div>
              <div>
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "دورية"
                )}/>
                <label> دورية</label>
              </div>
              <div>
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "قرار"
                )}/>
                <label> قرار</label>
              </div>
            </div>
            <div class="info-contain border-top">
              <div style="width: 100px">
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "منشور"
                )}/>
                <label> منشور</label>
              </div>
              <div style="width: 110px">
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "مذكرة"
                )}/>
                <label> مذكرة</label>
              </div>
              <div>
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "قاعدة بيانات"
                )}/>
                <label> قاعدة بيانات</label>
              </div>
              <div>
                <input type="checkbox" ${checkedOptions(
                  data?.requestedInfo,
                  "وثائق أخرى ذات طابع عام"
                )}/>
                <label> وثائق أخرى ذات طابع عام:</label>
              </div>
            </div>
          </div>
        </div>
        <div class="border-top flex-items-start">
          <p style="width: 145px;">الطريقة المرغوب فيها للحصول على المعلومات:</p>
          <div class="flex-items-start options-container info-options">
            <div style="width: 100px">
              <input type="checkbox" ${getRequestType(
                data?.recievedInfo,
                "الإطلاع المباشر بعين المكان"
              )}/>
              <label> الإطلاع المباشر بعين المكان</label>
            </div>
            <div style="display:block; border:none; width: 110px">
              <div style="margin-left: 0; width: 100%">
                <input type="checkbox" ${getRequestType(
                  data?.recievedInfo,
                  "التسلم بعين المكان"
                )}/>
                <label style="padding: 6px 7px 1px 0; height:auto"> التسلم بعين المكان</label>
              </div>
              <div>
                <input type="checkbox" style="-webkit-transform: scale(0.7)" />
                <label style="padding: 6px 6px 1px; font-size: 9px; height:auto"> نسخة ورقية</label>
              </div>
              <div>
                <input type="checkbox" style="-webkit-transform: scale(0.7)"" />
                <label style="padding: 4px 6px 15px; font-size: 9px; height:auto"> نسخة إلكترونية</label>
              </div>
            </div>
            <div style="margin-right: 1px;">
              <input type="checkbox" ${getRequestType(
                data?.recievedInfo,
                "عبر البريد الإلكتروني"
              )}/>
              <label> عبر البريد الإلكتروني</label>
            </div>
            <div>
              <input type="checkbox" ${getRequestType(
                data?.recievedInfo,
                "عبر البريد العادي"
              )}/>
              <label> عبر البريد العادي</label>
            </div>
            <div style="width: 110px">
              <input type="checkbox" ${getRequestType(
                data?.recievedInfo,
                "عبر الفاكس رقم:"
              )}/>
              <label> عبر الفاكس رقم: <br>
                أو أي حامل آخر:</label>
            </div>
          </div>
        </div>
        <p style="margin-top: 0;" class="border-top">كلفة الوثائق المطلوبة:</p>
        </div>
        <p class="turn-page">المرجو قلب الصفحة</p>
       <div class="bottom-text">
        <p>1 خاص بالمؤسسة أو الهيأة المعنية.</p>
        <p>3،2 عند الإقتضاء، يجب تحديد البريد الإلكتروني والهاتف.</p>
        <p>4 يمكن تحديد طبيعة المعلومات المطلوبة بصفة اختيارية.</p>
        <p>
          5 في حال عدم توفر المعلومات بالشكل المرغوب فيه، سيتم تسليم المعلومات
          حسب الطريقة والشكل المتاحين للمؤسسة أو الهيـةالمعنية
        </p>
        <p>6 يحدد عن االقتضاء من طرف المؤسسة أو الهيأة المعنية.</p>
        </div>
      </div>
      <div class="page-break"></div>
      <div>
          <div style="margin-top: 10px" class="bg-color section-title text-white second-page">
            (6) ضمانات الحق في الحصول على المعلومات
          </div>
         <div class="text-size-small border second-page">
           <ul style="list-style-type: square">
            <li>
              يتم الرد على طلب الحصول على المعلومات داخل أجل لايتعدى عشرين
              (20)يوما من أيام العمل، ابتداء من تاريخ تسلم الطلب.
             </li>
            <li>
              يمكن للمؤسسة أو الهيأة المعنية تمديد أجل عشرين (20)يوما من أيام
              العمل لمدة مماثلة، في الحالا ت التالية:
              <ul>
                <li>
                  عدم تمكن المؤسسةأوالهيأةالمعنيةمن االستجابة،كليا أوجزئيا، لطلب
                  المعني بالأمرخلال الأجل المذكور،
                </li>
                <li>إذا كان الطلب يتعلق بعدد كبير من المعلومات،</li>
                <li>إذا تعذر توفيرها خلال نفس الأجل،</li>
                <li>إذا كان تقديمها يحتاج إلى استشارةالغير قبل تسليمها.</li>
              </ul>
             <p>
              في جميع الحالات، يتم إشعار طالب المعلومات مسبقا بهذا التمديد كتابة
              أو عبر البريد الإلكتروني، مع ذكر الأسباب المعللة لهذا التمديد.
             </p>
            </li>
            <li>
              في حالة الإستعجال التي تقتضيها ضرورة حماية وسالمة وحرية الأشخاص،
              تلتزم المؤسسة أوالهيئة المعنية بالرد على طلب الحصول على المعلومات
              داخل أجل ثلاثة(3) أيام.
            </li>
            <li>
              لطالب المعلومات الحق في تقديم شكاية إلى:
              <ul>
                <li>
                  رئيس المؤسسة أو الهيأة المعنية داخل أجل عشرين(20) يوم عمل من
                  تاريخ انقضاء الأجل القانوني المخصص للرد على طلبه أو من تاريخ
                  التوصل بالرد؛
                </li>
                <li>
                  لجنةالحق في الحصول على المعلومات داخل أجل لا يتعدى ثالثين(30)
                  يوما الموالية لانصرام الأجل القانوني المخصص للرد عل شكايته
                  الموجهةإلى رئيس المؤسسة أو الهيأة المعنية، أومن تاريخ التوصل
                  بالرد على هذه الشكاية، والتي يتعين على اللجنة دراسة الشكاية
                  وإخبار المعني بالأمر بمآلها داخل أجل ثالثين(30) يوما من تاريخ
                  التوصل بها.
                </li>
              </ul>
            </li>
            <li>
              لطالب المعلومات حق الطعن أمام المحكمة الإدارية المختصة في قرار رئيس
              المؤسسة أو الهيأة المعنية، داخل أجل ستين(60) يوما من تاريخ التوصل
              بجواب لجنةالحق في الحصول على املعلومات بشأن شكايته، أومن تاريخ
              انصرام الأجل القانوني المخصص للرد على شكايته.
            </li>
            <li>
              تستعمل المعلومات المحصل عليها طبقا لمقتضيات المادة 6 من القانون رقم
              31.13
            </li>
            <li>
              تستثنىمن الحق فيالحصول علىالمعلومات،كل المعلوماتالمحددة طبقالمقتضيات
              المادة 7 من القانون رقم 31.13
            </li>
          </ul>
        </div>
        <div style="padding: 15px; width: 300px; margin-top: 10px" class="second-page bg-color section-title text-white">     
        </div>
      <div class="text-size-small border second-page">
        <p> بالتوقيع على هذه الإستمارة، يوافق صاحب(ة) الطلب على معالجة معطياته الشخصية من طرف (اسم الإدارة اوالهيئة المعنية) من أجل .......... (اذكر الغاية من المعالجة)
            هذه المعالجة كانت موضوع طلب إذن لدى اللجنة الوطنية لمر اقبة حماية المعطيات ذات الطابع الشخصي تحت رقم:.......... يمكن أن ترسل هذه المعطيات الشخصية المجمعة إلى.......... (اذكر كل المرسل إليهم المحتملين)
        </p>
        <p>يمكن لصاحب(ة) الطلب الإتصال ب....... لممارسة حقوقه(ها) في الولوج والتصحيح والتعرض وفقالمقتضيات القانون 09-08. </p>
      </div> 
      <div class="flex-items-start admition text-color ">
       <div style="margin-right: 20px">
        <input type="checkbox" />
        <label>
          ألتزم باستعمال و بإعادة استعمال المعلومات المطلوبة لأغراض
          مشروعة</label
        >
       </div>
       <div class="signature">
        <p>توقيع صاحب(ة) الطلب:</p>
       </div>
      </div> 
      <div class="flex-items-start second-page">
        <div style="width: 55%">
          <div class="bg-color section-title text-white">
            خاص بالمؤسسة أو الهيأة المعنية
          </div>
          <div class="text-size-small border">
            <p><span>الرقم الترتيبي لتسجيل الطلب: </span></p>
            <p>
              <span>اسم المؤسسة أوالهيأةالمعنية: </span>
              <span> ${org.name}</span>
            </p>
            <p>
              <span>الإسم الشخصي و العائلي لطالب المعلومات:</span>
              <span> ${data?.firstname} ${data?.lastname}</span>
            </p>
            <p><span>كلفة الوثائق المطلوبة:</span></p>
            <p><span>الإسم الكامل للشخص المكلف:</span></p>
            <p>
              <span>في:...........بتاريخ : .../.../...20
                توقيع وختم الشخص المكلف :.....................
              </span><span></span>
            </p>
          </div>
        </div>
        <div style="width: 45%">
          <div style="margin-right: 10px; class="options-container">
            <div class="bg-color section-title text-white">
              موضوع المعلومات المطلوبة:
            </div>
            <div style="min-height: 117px;" class="text-size-small border">
              <p> ${data?.subject}</p>
            </div>
          </div>    
        </div>
      </div>
      <div class="page-break"></div>`;
      })
      .join("");
  };

  return `
  <!DOCTYPE html>
  <html lang="ar">
    <head>
      <meta charset="UTF-8" />
      <style>
        @font-face {
          font-family: 'Droid Arabic Naskh';
          src: url('../public/DroidNaskh-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'Droid Arabic Naskh';
          src: url('../public/DroidNaskh-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        body {
          /*font-family: 'DroidArabicKufiRegular'; */
          font-family: 'Droid Arabic Naskh', serif !important;
          font-weight: normal;
          font-style: normal;
        }
        p {
          margin: 3px 0px;
        }
        .container {
          padding: 25px;
          position: relative;
        }
        .container-flex-between {
          display: flex;
          justify-content: space-between;
          display: -webkit-flex;
          -webkit-justify-content: space-between;
        }
        .flex-items-start {
          display: flex;
          align-items: flex-start;
          display: -webkit-flex;
          -webkit-align-items: flex-start;
        }
        .text-white {
          color: #fff;
        }
        .text-color {
          color: rgb(103, 103, 253);
        }
        .bg-color {
          background-color: #000;
        }
        .top-title {
          border: 2px solid rgb(177, 177, 255);
          color: rgb(103, 103, 253);
          padding: 10px;
          font-size: 25px;
          align-self: flex-end;
          -webkit-align-self: flex-end;
        }
        .text-size-small {
          font-size: 12px;
          font-weight: 600;
        }
        .align-center {
          align-items: center;
          -webkit-align-items: center;
        }
        .section-title {
          font-size: 14px;
          padding: 0px 5px;
          text-align: center;
          margin-top: 5px;
          width: fit-content;
          width: -webkit-fit-content;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .options-container,
        .info-contain div:last-child {
          flex-grow: 1; 
          -webkit-flex-grow: 1;     
        }
        .info-contain {
          font-size: 11px;
          display: flex;
          display: -webkit-flex;       
        }
        .info-contain div {
          width: 95px;
          border-right: 1px solid rgb(153, 153, 153);
        }
        .info-contain label {
          border-right: 1px solid rgb(153, 153, 153);
          padding: 7px 6px;
        }
        .info-contain input {
          margin: 6px 6px 6px 2px;        
        }
        .info-options {
          font-size: 10px;
        }
        .info-options div {
          display: flex;
          align-items: flex-start;
          display: -webkit-flex;
          -webkit-align-items: flex-start;
          width: 95px;
          border-right: 1px solid rgb(153, 153, 153);
        }
        .info-options label {
          border-right: 1px solid rgb(153, 153, 153);
          padding: 4px 6px 10px;
          height: 55px
        }
        .info-options input {
          margin: 6px 6px 0 6px;
        }
        .requested-info p {
          padding: 0px 2px;
        }
        .image {
          width: 100px;
          height: 100px;
        }
        .border {
          border: 2px solid rgb(153, 153, 153);
          padding: 4px;
        }
        .border-top {
          border-top: 1px solid rgb(153, 153, 153);
        }
        .self-center {
          align-self: center;
          -webkit-align-self: center;
        }
        .turn-page {
          font-size: 14px;
          font-weight: bold;
          text-align: left;
          margin: 100px 0 20px 50px;
        }
        .bottom-text p {
          font-size: 10px;
          font-weight: bold;
          margin: 0;
        }
        li {
          margin-bottom: 5px;
        }
        .second-page {
          margin: 0 25px;
        }
        .admition {
          font-size: 11px;
          font-weight: bold;
          margin: 20px;
        }
        .signature {
          margin-right: 150px;
          border: 2px solid rgb(153, 153, 153);;
          padding: 0 5px 20px 120px;      
        }
        .right-side-text {
          font-size: 10px;
          position: absolute;
          top: 400px;
          right: -210px;
          -webkit-transform: rotate(-90deg);         
        }
        .left-side-text {
          font-size: 10px;
          position: absolute;
          -webkit-transform: rotate(-90deg);
          top: 590px;
          left: -210px;
        }
        .page-break {
          page-break-after: always;
        }
        .page-break:last-child {
          page-break-after: avoid;
        }
      </style>
    </head>
    <body dir="rtl">
        ${pdfTemplate(data.chosenOrgs)}
        
    </body>
  </html>  
  `;
};
