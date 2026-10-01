import Image from "next/image";
import { footerLinks, legalLinks } from "@/data/site";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative bg-white pt-[71px] pb-12">
      <Image
        src="/assets/icons/line-top.svg"
        alt=""
        width={1440}
        height={1}
        className="absolute inset-x-0 top-0 h-px w-full"
      />
      <Container className="flex flex-col gap-16 lg:gap-[130px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[92px]">
          <div className="flex flex-col gap-[45px] lg:w-[528px]">
            <div className="flex flex-col gap-4">
              <Logo tone="dark" />
              <p className="font-body text-sm leading-[1.6] text-shuttle-950">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <NewsletterForm />
              <p className="max-w-[504px] font-body text-xs leading-[1.6] text-shuttle-950">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:w-[580px] lg:gap-10 lg:pt-12">
            {footerLinks.map((column, i) => (
              <ul key={i} className="flex flex-col gap-4 font-body text-sm leading-[1.6]">
                {column.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm leading-[1.6] whitespace-nowrap text-shuttle-950 transition-colors hover:text-persian-blue-800"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:h-[42px] lg:justify-between lg:gap-0">
          <Image src="/assets/icons/line-footer.svg" alt="" width={1200} height={1} className="h-px w-full" />
          <div className="flex flex-col gap-3 font-body text-xs leading-[1.6] text-shuttle-950 sm:flex-row sm:justify-between">
            <p>@ 2023 ByteSpace. All rights reserved.</p>
            <ul className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-persian-blue-800">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
