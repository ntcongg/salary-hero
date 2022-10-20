-- CreateTable
CREATE TABLE "companies" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" BIGSERIAL NOT NULL,
    "companyid" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'employee',
    "salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "address" TEXT NOT NULL DEFAULT 'Ha Noi, Viet Nam',
    "dob" TIMESTAMP(3) NOT NULL,
    "phonenumber" BIGINT NOT NULL,
    "updateddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT NOT NULL DEFAULT 'admin',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" BIGSERIAL NOT NULL,
    "companyid" BIGINT NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT NOT NULL DEFAULT 'admin',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position_history" (
    "id" BIGSERIAL NOT NULL,
    "updateby" BIGINT NOT NULL,
    "employeeid" BIGINT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "updatedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "position_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_history" (
    "id" BIGSERIAL NOT NULL,
    "addedby" BIGINT NOT NULL,
    "employeeid" BIGINT NOT NULL,
    "addeddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money_request" (
    "id" BIGSERIAL NOT NULL,
    "employeeid" BIGINT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "requesteddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "money_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_phonenumber_key" ON "employees"("phonenumber");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_history" ADD CONSTRAINT "position_history_updateby_fkey" FOREIGN KEY ("updateby") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_history" ADD CONSTRAINT "position_history_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_history" ADD CONSTRAINT "employee_history_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_history" ADD CONSTRAINT "employee_history_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "money_request" ADD CONSTRAINT "money_request_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
