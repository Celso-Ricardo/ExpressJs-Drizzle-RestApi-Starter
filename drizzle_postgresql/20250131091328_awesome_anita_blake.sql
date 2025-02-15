ALTER TABLE "currencies" ADD CONSTRAINT "currencies_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_symbol_unique" UNIQUE("symbol");--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_code_unique" UNIQUE("code");