
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form action="https://formsubmit.co/contact@vylscapital.com" method="POST" className="space-y-6">
              {/* Formsubmit.co settings */}
              <input type="hidden" name="_next" value="https://vylscapital-demo.web.app/demande-de-pret/merci" />
              <input type="hidden" name="_subject" value="Nouveau Message depuis VylsCapital (Contact)" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom Complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} name={field.name} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="vous@exemple.com" {...field} name={field.name} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre Message</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Comment pouvons-nous vous aider aujourd'hui ?" {...field} name={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">
                <Send />
                Envoyer le Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
