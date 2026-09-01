export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      all_cohorts: {
        Row: {
          application_deadline: string | null
          cohort_key: string | null
          cohort_label: string | null
          created_at: string
          end_date: string | null
          id: string
          is_cancelled: boolean
          program_code: string | null
          program_id: string
          seats_filled: number
          seats_total: number | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          cohort_key?: string | null
          cohort_label?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          is_cancelled?: boolean
          program_code?: string | null
          program_id: string
          seats_filled?: number
          seats_total?: number | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          cohort_key?: string | null
          cohort_label?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          is_cancelled?: boolean
          program_code?: string | null
          program_id?: string
          seats_filled?: number
          seats_total?: number | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "all_cohorts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "all_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      all_masterclasses: {
        Row: {
          apply_url: string | null
          audience: string
          capacity: number | null
          cohort_id: string | null
          created_at: string
          description: string | null
          display_timezone: string
          duration_minutes: number
          host_mentor_id: string | null
          host_name: string | null
          id: string
          is_cancelled: boolean
          is_published: boolean
          join_url: string | null
          learning_outcomes: Json
          page_copy: Json | null
          partner_id: string
          passcode: string | null
          program_id: string | null
          recording_url: string | null
          scheduled_at: string | null
          series: string | null
          session_number: number | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          apply_url?: string | null
          audience?: string
          capacity?: number | null
          cohort_id?: string | null
          created_at?: string
          description?: string | null
          display_timezone?: string
          duration_minutes?: number
          host_mentor_id?: string | null
          host_name?: string | null
          id?: string
          is_cancelled?: boolean
          is_published?: boolean
          join_url?: string | null
          learning_outcomes?: Json
          page_copy?: Json | null
          partner_id: string
          passcode?: string | null
          program_id?: string | null
          recording_url?: string | null
          scheduled_at?: string | null
          series?: string | null
          session_number?: number | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          apply_url?: string | null
          audience?: string
          capacity?: number | null
          cohort_id?: string | null
          created_at?: string
          description?: string | null
          display_timezone?: string
          duration_minutes?: number
          host_mentor_id?: string | null
          host_name?: string | null
          id?: string
          is_cancelled?: boolean
          is_published?: boolean
          join_url?: string | null
          learning_outcomes?: Json
          page_copy?: Json | null
          partner_id?: string
          passcode?: string | null
          program_id?: string | null
          recording_url?: string | null
          scheduled_at?: string | null
          series?: string | null
          session_number?: number | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "all_masterclasses_host_mentor_id_fkey"
            columns: ["host_mentor_id"]
            isOneToOne: false
            referencedRelation: "all_mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "all_masterclasses_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "all_masterclasses_partner_program_fk"
            columns: ["partner_id", "program_id"]
            isOneToOne: false
            referencedRelation: "all_programs"
            referencedColumns: ["partner_id", "id"]
          },
          {
            foreignKeyName: "all_masterclasses_program_cohort_fk"
            columns: ["program_id", "cohort_id"]
            isOneToOne: false
            referencedRelation: "all_cohorts"
            referencedColumns: ["program_id", "id"]
          },
        ]
      }
      all_mentors: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          image_url: string | null
          is_active: boolean
          university: string | null
          updated_at: string
          updated_by_platform: string | null
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          university?: string | null
          updated_at?: string
          updated_by_platform?: string | null
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          university?: string | null
          updated_at?: string
          updated_by_platform?: string | null
        }
        Relationships: []
      }
      all_partners: {
        Row: {
          approval_status: string
          approved_at: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          offerings: string[]
          org_name: string
          partner_slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          approval_status?: string
          approved_at?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          offerings?: string[]
          org_name: string
          partner_slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          approval_status?: string
          approved_at?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          offerings?: string[]
          org_name?: string
          partner_slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      all_programs: {
        Row: {
          age_max: number | null
          age_min: number | null
          apply_url: string | null
          categories: string[]
          cover_image_url: string | null
          created_at: string
          description: string | null
          duration: string | null
          early_bird_price: number | null
          eligibility_grades: string | null
          format: string | null
          id: string
          is_active: boolean
          location: string | null
          partner_id: string
          pay_slug: string | null
          price_currency: string
          product_match_keywords: string[]
          program_name: string
          program_url: string | null
          short_description: string | null
          sticker_price: number
          tags: string[]
          target_categories: string[]
          updated_at: string
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          apply_url?: string | null
          categories?: string[]
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          early_bird_price?: number | null
          eligibility_grades?: string | null
          format?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          partner_id: string
          pay_slug?: string | null
          price_currency?: string
          product_match_keywords?: string[]
          program_name: string
          program_url?: string | null
          short_description?: string | null
          sticker_price: number
          tags?: string[]
          target_categories?: string[]
          updated_at?: string
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          apply_url?: string | null
          categories?: string[]
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          early_bird_price?: number | null
          eligibility_grades?: string | null
          format?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          partner_id?: string
          pay_slug?: string | null
          price_currency?: string
          product_match_keywords?: string[]
          program_name?: string
          program_url?: string | null
          short_description?: string | null
          sticker_price?: number
          tags?: string[]
          target_categories?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "all_programs_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors_applications: {
        Row: {
          agreed_to_terms: boolean
          amount: number | null
          app_status: string
          applied_date: string
          city: string | null
          cohort: string
          comments: string | null
          completion_token: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          grade: string | null
          hear_about: string | null
          id: string
          metadata: Json
          motivation: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_status: string
          reviewed_at: string | null
          scholarship_code: string | null
          school: string | null
          student_dob: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          submission_token: string
          updated_at: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          agreed_to_terms?: boolean
          amount?: number | null
          app_status?: string
          applied_date?: string
          city?: string | null
          cohort: string
          comments?: string | null
          completion_token?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          metadata?: Json
          motivation?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          reviewed_at?: string | null
          scholarship_code?: string | null
          school?: string | null
          student_dob?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          submission_token?: string
          updated_at?: string
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          agreed_to_terms?: boolean
          amount?: number | null
          app_status?: string
          applied_date?: string
          city?: string | null
          cohort?: string
          comments?: string | null
          completion_token?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          metadata?: Json
          motivation?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          reviewed_at?: string | null
          scholarship_code?: string | null
          school?: string | null
          student_dob?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          submission_token?: string
          updated_at?: string
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      doctors_masterclass_regs: {
        Row: {
          attendee_type: string | null
          category: string
          consent: boolean
          country: string | null
          created_at: string
          designation: string | null
          email: string
          full_name: string
          grade: string | null
          id: string
          masterclass_ids: string[]
          meta: Json
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          school: string | null
          sessions: string[]
          status: string
          student_name: string | null
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          attendee_type?: string | null
          category?: string
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          full_name: string
          grade?: string | null
          id?: string
          masterclass_ids?: string[]
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          school?: string | null
          sessions?: string[]
          status?: string
          student_name?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          attendee_type?: string | null
          category?: string
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          full_name?: string
          grade?: string | null
          id?: string
          masterclass_ids?: string[]
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          school?: string | null
          sessions?: string[]
          status?: string
          student_name?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      edge_applications: {
        Row: {
          amount: number | null
          assigned_mentor: string | null
          city: string | null
          cohort: string
          country: string | null
          created_at: string
          currency: string | null
          day_slot: string | null
          grade: string | null
          group_name: string | null
          id: string
          internship_addon: boolean | null
          message: string | null
          notes: string | null
          parent_email: string
          parent_name: string
          parent_phone: string
          payment_date: string | null
          payment_id: string | null
          payment_status: string | null
          plan: string | null
          program: string | null
          referral_source: string | null
          scholarship_code: string | null
          school: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string | null
          student_name: string
          student_phone: string | null
          submission_token: string
          subscription_status: string | null
          track: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount?: number | null
          assigned_mentor?: string | null
          city?: string | null
          cohort?: string
          country?: string | null
          created_at?: string
          currency?: string | null
          day_slot?: string | null
          grade?: string | null
          group_name?: string | null
          id?: string
          internship_addon?: boolean | null
          message?: string | null
          notes?: string | null
          parent_email: string
          parent_name: string
          parent_phone: string
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          plan?: string | null
          program?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name: string
          student_phone?: string | null
          submission_token?: string
          subscription_status?: string | null
          track?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount?: number | null
          assigned_mentor?: string | null
          city?: string | null
          cohort?: string
          country?: string | null
          created_at?: string
          currency?: string | null
          day_slot?: string | null
          grade?: string | null
          group_name?: string | null
          id?: string
          internship_addon?: boolean | null
          message?: string | null
          notes?: string | null
          parent_email?: string
          parent_name?: string
          parent_phone?: string
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          plan?: string | null
          program?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string
          student_phone?: string | null
          submission_token?: string
          subscription_status?: string | null
          track?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      edge_autosaved_leads: {
        Row: {
          city: string | null
          converted: boolean | null
          country: string | null
          created_at: string | null
          grade: string | null
          id: string
          lead_type: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          plan: string | null
          program: string | null
          program_band: string | null
          raw_data: Json | null
          reminder_count: string | null
          reminder_sent_at: string | null
          school: string | null
          source: string
          student_email: string | null
          student_name: string | null
          student_phone: string | null
          track: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city?: string | null
          converted?: boolean | null
          country?: string | null
          created_at?: string | null
          grade?: string | null
          id: string
          lead_type?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          plan?: string | null
          program?: string | null
          program_band?: string | null
          raw_data?: Json | null
          reminder_count?: string | null
          reminder_sent_at?: string | null
          school?: string | null
          source: string
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          track?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string | null
          converted?: boolean | null
          country?: string | null
          created_at?: string | null
          grade?: string | null
          id?: string
          lead_type?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          plan?: string | null
          program?: string | null
          program_band?: string | null
          raw_data?: Json | null
          reminder_count?: string | null
          reminder_sent_at?: string | null
          school?: string | null
          source?: string
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          track?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      edge_masterclass_inquiries: {
        Row: {
          contact_name: string
          created_at: string
          email: string
          grade: string | null
          id: string
          phone: string
          preferred_date: string
          preferred_time: string
          school_name: string
          student_count: number
          topic: string
        }
        Insert: {
          contact_name: string
          created_at?: string
          email: string
          grade?: string | null
          id?: string
          phone: string
          preferred_date: string
          preferred_time: string
          school_name: string
          student_count?: number
          topic: string
        }
        Update: {
          contact_name?: string
          created_at?: string
          email?: string
          grade?: string | null
          id?: string
          phone?: string
          preferred_date?: string
          preferred_time?: string
          school_name?: string
          student_count?: number
          topic?: string
        }
        Relationships: []
      }
      edge_recommendations: {
        Row: {
          created_at: string
          id: string
          ref1_email: string
          ref1_name: string
          ref1_phone: string
          ref2_email: string | null
          ref2_name: string | null
          ref2_phone: string | null
          ref3_email: string | null
          ref3_name: string | null
          ref3_phone: string | null
          ref4_email: string | null
          ref4_name: string | null
          ref4_phone: string | null
          ref5_email: string | null
          ref5_name: string | null
          ref5_phone: string | null
          referrer_email: string
          referrer_name: string
          referrer_phone: string | null
          status: string
          total_referrals: number
        }
        Insert: {
          created_at?: string
          id?: string
          ref1_email: string
          ref1_name: string
          ref1_phone: string
          ref2_email?: string | null
          ref2_name?: string | null
          ref2_phone?: string | null
          ref3_email?: string | null
          ref3_name?: string | null
          ref3_phone?: string | null
          ref4_email?: string | null
          ref4_name?: string | null
          ref4_phone?: string | null
          ref5_email?: string | null
          ref5_name?: string | null
          ref5_phone?: string | null
          referrer_email: string
          referrer_name: string
          referrer_phone?: string | null
          status?: string
          total_referrals?: number
        }
        Update: {
          created_at?: string
          id?: string
          ref1_email?: string
          ref1_name?: string
          ref1_phone?: string
          ref2_email?: string | null
          ref2_name?: string | null
          ref2_phone?: string | null
          ref3_email?: string | null
          ref3_name?: string | null
          ref3_phone?: string | null
          ref4_email?: string | null
          ref4_name?: string | null
          ref4_phone?: string | null
          ref5_email?: string | null
          ref5_name?: string | null
          ref5_phone?: string | null
          referrer_email?: string
          referrer_name?: string
          referrer_phone?: string | null
          status?: string
          total_referrals?: number
        }
        Relationships: []
      }
      edge_school_inquiries: {
        Row: {
          city: string
          contact_name: string
          country: string
          created_at: string
          email: string
          grade_range: string | null
          id: string
          message: string | null
          phone: string
          school_name: string
          student_count: number
        }
        Insert: {
          city: string
          contact_name: string
          country: string
          created_at?: string
          email: string
          grade_range?: string | null
          id?: string
          message?: string | null
          phone: string
          school_name: string
          student_count?: number
        }
        Update: {
          city?: string
          contact_name?: string
          country?: string
          created_at?: string
          email?: string
          grade_range?: string | null
          id?: string
          message?: string | null
          phone?: string
          school_name?: string
          student_count?: number
        }
        Relationships: []
      }
      finlit_applications: {
        Row: {
          amount: number | null
          amount_paid: number
          city: string | null
          cohort: string
          completion_status: string
          completion_token: string | null
          country: string | null
          created_at: string
          currency: string | null
          essay_motivation: string
          grade_level: string
          id: string
          last_payment_reminder_at: string | null
          parent_consent: boolean
          parent_email: string
          parent_name: string
          parent_phone: string | null
          payment_currency: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_reminder_count: number
          payment_reminder_sent_at: string | null
          payment_reminders_paused: boolean
          payment_status: string
          referral_source: string | null
          reviewer_notes: string | null
          school: string
          state: string | null
          stripe_customer_id: string | null
          stub_source: string | null
          student_dob: string | null
          student_email: string
          student_first_name: string
          student_last_name: string
          student_phone: string | null
          submission_token: string
          track: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount?: number | null
          amount_paid?: number
          city?: string | null
          cohort?: string
          completion_status?: string
          completion_token?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          essay_motivation: string
          grade_level: string
          id?: string
          last_payment_reminder_at?: string | null
          parent_consent?: boolean
          parent_email: string
          parent_name: string
          parent_phone?: string | null
          payment_currency?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_reminder_count?: number
          payment_reminder_sent_at?: string | null
          payment_reminders_paused?: boolean
          payment_status?: string
          referral_source?: string | null
          reviewer_notes?: string | null
          school: string
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email: string
          student_first_name: string
          student_last_name: string
          student_phone?: string | null
          submission_token?: string
          track?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount?: number | null
          amount_paid?: number
          city?: string | null
          cohort?: string
          completion_status?: string
          completion_token?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          essay_motivation?: string
          grade_level?: string
          id?: string
          last_payment_reminder_at?: string | null
          parent_consent?: boolean
          parent_email?: string
          parent_name?: string
          parent_phone?: string | null
          payment_currency?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_reminder_count?: number
          payment_reminder_sent_at?: string | null
          payment_reminders_paused?: boolean
          payment_status?: string
          referral_source?: string | null
          reviewer_notes?: string | null
          school?: string
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email?: string
          student_first_name?: string
          student_last_name?: string
          student_phone?: string | null
          submission_token?: string
          track?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      finlit_masterclass_regs: {
        Row: {
          country: string | null
          created_at: string
          designation: string | null
          email: string
          full_name: string
          grade: string | null
          id: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          role: string
          school_name: string | null
          selected_sessions: string
          session_key: string | null
          session_keys: string[]
          student_grade: string | null
          student_name: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          full_name: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          role: string
          school_name?: string | null
          selected_sessions: string
          session_key?: string | null
          session_keys?: string[]
          student_grade?: string | null
          student_name?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          full_name?: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          role?: string
          school_name?: string | null
          selected_sessions?: string
          session_key?: string | null
          session_keys?: string[]
          student_grade?: string | null
          student_name?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      huso_candidates_india: {
        Row: {
          amount: number | null
          application_number: string | null
          based_country_name: string | null
          based_in_different_country_than_india: string | null
          city: string | null
          counselor_principal_email: string | null
          counselor_principal_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          currently_studying_in_class: string | null
          id: number
          name: string | null
          order_id: string | null
          other_city_name: string | null
          parent_guardian_country_code: string | null
          parent_guardian_email_address: string | null
          parent_guardian_mobile_number: string | null
          parent_guardian_name: string | null
          payment_date: string | null
          payment_id: string | null
          region: string | null
          registered_date: string | null
          scholarship_code: string | null
          school_name: string | null
          state: string | null
          status: string | null
          student_email_address: string | null
          student_mobile_number: string | null
          student_mobile_number_country_code: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          application_number?: string | null
          based_country_name?: string | null
          based_in_different_country_than_india?: string | null
          city?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          other_city_name?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          region?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          application_number?: string | null
          based_country_name?: string | null
          based_in_different_country_than_india?: string | null
          city?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          other_city_name?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          region?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      huso_candidates_me: {
        Row: {
          amount: number | null
          application_number: string | null
          counselor_principal_email: string | null
          counselor_principal_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          currently_studying_in_class: string | null
          id: number
          name: string | null
          order_id: string | null
          parent_guardian_country_code: string | null
          parent_guardian_email_address: string | null
          parent_guardian_mobile_number: string | null
          parent_guardian_name: string | null
          payment_date: string | null
          payment_id: string | null
          region: string | null
          registered_date: string | null
          scholarship_code: string | null
          school_name: string | null
          state: string | null
          status: string | null
          student_email_address: string | null
          student_mobile_number: string | null
          student_mobile_number_country_code: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          application_number?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          region?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          application_number?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          region?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      lawyers_applications: {
        Row: {
          amount: number | null
          city: string | null
          cohort: string
          comments: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          counsellor_phone: string | null
          country: string | null
          created_at: string
          currency: string | null
          grade: string | null
          hear_about: string | null
          id: string
          last_refund_at: string | null
          motivation: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_status: string
          program_code: string | null
          referrer: string | null
          refunded_amount: number
          school: string | null
          source_url: string | null
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          submission_token: string
          timezone: string | null
          user_agent: string | null
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          amount?: number | null
          city?: string | null
          cohort: string
          comments?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          counsellor_phone?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          last_refund_at?: string | null
          motivation?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          program_code?: string | null
          referrer?: string | null
          refunded_amount?: number
          school?: string | null
          source_url?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          submission_token?: string
          timezone?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          amount?: number | null
          city?: string | null
          cohort?: string
          comments?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          counsellor_phone?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          last_refund_at?: string | null
          motivation?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          program_code?: string | null
          referrer?: string | null
          refunded_amount?: number
          school?: string | null
          source_url?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          submission_token?: string
          timezone?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      lawyers_masterclass_regs: {
        Row: {
          attendee_type: string
          city: string | null
          consent: boolean
          country: string | null
          created_at: string
          designation: string | null
          email: string
          email_sent_at: string | null
          full_name: string
          grade: string | null
          hear_about: string | null
          id: string
          masterclass_ids: string[] | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          promotes_program_code: string | null
          referrer: string | null
          school: string | null
          sessions: string[]
          source_url: string | null
          state: string | null
          student_grade: string | null
          student_name: string | null
          user_agent: string | null
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          attendee_type: string
          city?: string | null
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          email_sent_at?: string | null
          full_name: string
          grade?: string | null
          hear_about?: string | null
          id?: string
          masterclass_ids?: string[] | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          promotes_program_code?: string | null
          referrer?: string | null
          school?: string | null
          sessions: string[]
          source_url?: string | null
          state?: string | null
          student_grade?: string | null
          student_name?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          attendee_type?: string
          city?: string | null
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          email_sent_at?: string | null
          full_name?: string
          grade?: string | null
          hear_about?: string | null
          id?: string
          masterclass_ids?: string[] | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          promotes_program_code?: string | null
          referrer?: string | null
          school?: string | null
          sessions?: string[]
          source_url?: string | null
          state?: string | null
          student_grade?: string | null
          student_name?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          city: string
          country: string | null
          id: number
          name: string
          state: string
          state_short: string
        }
        Insert: {
          city: string
          country?: string | null
          id?: never
          name: string
          state: string
          state_short: string
        }
        Update: {
          city?: string
          country?: string | null
          id?: never
          name?: string
          state?: string
          state_short?: string
        }
        Relationships: []
      }
      master_data: {
        Row: {
          city: string | null
          company_linkedin_url: string | null
          company_name: string
          corporate_phone: string | null
          country: string | null
          created_at: string
          data_user: string | null
          email: string | null
          email_status: string | null
          first_name: string
          id: string
          industry: string | null
          keywords: string | null
          last_email_sent_at: string | null
          last_name: string
          person_linkedin_url: string | null
          primary_email_source: string | null
          state: string | null
          title: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          city?: string | null
          company_linkedin_url?: string | null
          company_name?: string
          corporate_phone?: string | null
          country?: string | null
          created_at?: string
          data_user?: string | null
          email?: string | null
          email_status?: string | null
          first_name?: string
          id?: string
          industry?: string | null
          keywords?: string | null
          last_email_sent_at?: string | null
          last_name?: string
          person_linkedin_url?: string | null
          primary_email_source?: string | null
          state?: string | null
          title?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          city?: string | null
          company_linkedin_url?: string | null
          company_name?: string
          corporate_phone?: string | null
          country?: string | null
          created_at?: string
          data_user?: string | null
          email?: string | null
          email_status?: string | null
          first_name?: string
          id?: string
          industry?: string | null
          keywords?: string | null
          last_email_sent_at?: string | null
          last_name?: string
          person_linkedin_url?: string | null
          primary_email_source?: string | null
          state?: string | null
          title?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      onward_applications: {
        Row: {
          amount_currency: string | null
          amount_paid_minor: number | null
          city: string | null
          cohort: string | null
          cohort_id: string | null
          completion_status: string
          completion_token: string | null
          country: string | null
          created_at: string | null
          entry_source: string
          form_submitted_at: string | null
          grade_level: string | null
          id: string
          paid_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          pathway: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_status: string | null
          program_code: string | null
          promo_code: string | null
          referral_source: string | null
          scholarship_code: string | null
          school_name: string | null
          state: string | null
          stripe_customer_id: string | null
          stub_source: string | null
          student_dob: string | null
          student_email: string | null
          student_name: string | null
          student_phone: string | null
          submission_token: string
          synced_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount_currency?: string | null
          amount_paid_minor?: number | null
          city?: string | null
          cohort?: string | null
          cohort_id?: string | null
          completion_status?: string
          completion_token?: string | null
          country?: string | null
          created_at?: string | null
          entry_source?: string
          form_submitted_at?: string | null
          grade_level?: string | null
          id?: string
          paid_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string | null
          program_code?: string | null
          promo_code?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          submission_token?: string
          synced_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount_currency?: string | null
          amount_paid_minor?: number | null
          city?: string | null
          cohort?: string | null
          cohort_id?: string | null
          completion_status?: string
          completion_token?: string | null
          country?: string | null
          created_at?: string | null
          entry_source?: string
          form_submitted_at?: string | null
          grade_level?: string | null
          id?: string
          paid_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_status?: string | null
          program_code?: string | null
          promo_code?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          submission_token?: string
          synced_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onward_applications_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "all_cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      onward_masterclass_regs: {
        Row: {
          child_grade: string | null
          child_name: string | null
          country: string | null
          created_at: string
          designation: string | null
          email: string
          email_sent: boolean
          email_sent_at: string | null
          full_name: string
          grade: string | null
          id: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          program_key: string
          questions: string | null
          role: string
          school_name: string | null
          sessions: string[]
          synced_at: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          child_grade?: string | null
          child_name?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          email_sent?: boolean
          email_sent_at?: string | null
          full_name: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          program_key?: string
          questions?: string | null
          role: string
          school_name?: string | null
          sessions?: string[]
          synced_at?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          child_grade?: string | null
          child_name?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          email_sent?: boolean
          email_sent_at?: string | null
          full_name?: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          program_key?: string
          questions?: string | null
          role?: string
          school_name?: string | null
          sessions?: string[]
          synced_at?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      platform_api_clients: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          key_hash: string
          last_used_at: string | null
          name: string
          platform_slug: string
          scopes: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          key_hash: string
          last_used_at?: string | null
          name: string
          platform_slug: string
          scopes?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          key_hash?: string
          last_used_at?: string | null
          name?: string
          platform_slug?: string
          scopes?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      prelaw_applications: {
        Row: {
          additional_info: string | null
          amount: number | null
          country: string | null
          created_at: string
          currency: string | null
          current_age: number | null
          current_class: string | null
          date_of_birth: string | null
          gender: string | null
          has_us_visa: string | null
          id: string
          parent_guardian_email: string | null
          parent_guardian_mobile_number: string | null
          parent_guardian_name: string | null
          payment_date: string | null
          payment_id: string | null
          program_code: string | null
          scholarship_code: string | null
          school_counsellor_email: string | null
          school_counsellor_name: string | null
          school_name: string | null
          school_years: number | null
          state_province_region_city: string | null
          student_email: string | null
          student_first_name: string | null
          student_last_name: string | null
          student_middle_name: string | null
          student_mobile_number: string | null
          submitted_at: string
          updated_at: string
          why_lawyer: string | null
        }
        Insert: {
          additional_info?: string | null
          amount?: number | null
          country?: string | null
          created_at?: string
          currency?: string | null
          current_age?: number | null
          current_class?: string | null
          date_of_birth?: string | null
          gender?: string | null
          has_us_visa?: string | null
          id?: string
          parent_guardian_email?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          program_code?: string | null
          scholarship_code?: string | null
          school_counsellor_email?: string | null
          school_counsellor_name?: string | null
          school_name?: string | null
          school_years?: number | null
          state_province_region_city?: string | null
          student_email?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_middle_name?: string | null
          student_mobile_number?: string | null
          submitted_at: string
          updated_at?: string
          why_lawyer?: string | null
        }
        Update: {
          additional_info?: string | null
          amount?: number | null
          country?: string | null
          created_at?: string
          currency?: string | null
          current_age?: number | null
          current_class?: string | null
          date_of_birth?: string | null
          gender?: string | null
          has_us_visa?: string | null
          id?: string
          parent_guardian_email?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          program_code?: string | null
          scholarship_code?: string | null
          school_counsellor_email?: string | null
          school_counsellor_name?: string | null
          school_name?: string | null
          school_years?: number | null
          state_province_region_city?: string | null
          student_email?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_middle_name?: string | null
          student_mobile_number?: string | null
          submitted_at?: string
          updated_at?: string
          why_lawyer?: string | null
        }
        Relationships: []
      }
      premed_applications: {
        Row: {
          additional_info: string | null
          amount: number | null
          country: string | null
          created_at: string
          currency: string | null
          current_age: number | null
          current_class: string | null
          date_of_birth: string | null
          gender: string | null
          has_us_visa: string | null
          id: string
          parent_guardian_email: string | null
          parent_guardian_mobile_number: string | null
          parent_guardian_name: string | null
          payment_date: string | null
          payment_id: string | null
          program_code: string | null
          scholarship_code: string | null
          school_counsellor_email: string | null
          school_counsellor_name: string | null
          school_name: string | null
          school_years: number | null
          state_province_region_city: string | null
          student_email: string | null
          student_first_name: string | null
          student_last_name: string | null
          student_middle_name: string | null
          student_mobile_number: string | null
          submitted_at: string
          updated_at: string
          why_doctor: string | null
        }
        Insert: {
          additional_info?: string | null
          amount?: number | null
          country?: string | null
          created_at?: string
          currency?: string | null
          current_age?: number | null
          current_class?: string | null
          date_of_birth?: string | null
          gender?: string | null
          has_us_visa?: string | null
          id?: string
          parent_guardian_email?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          program_code?: string | null
          scholarship_code?: string | null
          school_counsellor_email?: string | null
          school_counsellor_name?: string | null
          school_name?: string | null
          school_years?: number | null
          state_province_region_city?: string | null
          student_email?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_middle_name?: string | null
          student_mobile_number?: string | null
          submitted_at: string
          updated_at?: string
          why_doctor?: string | null
        }
        Update: {
          additional_info?: string | null
          amount?: number | null
          country?: string | null
          created_at?: string
          currency?: string | null
          current_age?: number | null
          current_class?: string | null
          date_of_birth?: string | null
          gender?: string | null
          has_us_visa?: string | null
          id?: string
          parent_guardian_email?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          program_code?: string | null
          scholarship_code?: string | null
          school_counsellor_email?: string | null
          school_counsellor_name?: string | null
          school_name?: string | null
          school_years?: number | null
          state_province_region_city?: string | null
          student_email?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_middle_name?: string | null
          student_mobile_number?: string | null
          submitted_at?: string
          updated_at?: string
          why_doctor?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          created_by_email: string | null
          created_by_platform: string | null
          currency: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_redemptions: number | null
          note: string | null
          program_id: string
          program_name: string | null
          redemption_count: number
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          created_by_email?: string | null
          created_by_platform?: string | null
          currency?: string | null
          discount_type?: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          note?: string | null
          program_id: string
          program_name?: string | null
          redemption_count?: number
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by_email?: string | null
          created_by_platform?: string | null
          currency?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          note?: string | null
          program_id?: string
          program_name?: string | null
          redemption_count?: number
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "all_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_redemptions: {
        Row: {
          amount_after: number | null
          amount_before: number | null
          application_id: string | null
          cohort_code: string | null
          created_at: string
          currency: string | null
          customer_email: string | null
          discount_amount: number | null
          id: string
          payment_intent_id: string
          platform_slug: string | null
          program_code: string | null
          promo_code: string
          promo_code_id: string | null
        }
        Insert: {
          amount_after?: number | null
          amount_before?: number | null
          application_id?: string | null
          cohort_code?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          discount_amount?: number | null
          id?: string
          payment_intent_id: string
          platform_slug?: string | null
          program_code?: string | null
          promo_code: string
          promo_code_id?: string | null
        }
        Update: {
          amount_after?: number | null
          amount_before?: number | null
          application_id?: string | null
          cohort_code?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          discount_amount?: number | null
          id?: string
          payment_intent_id?: string
          platform_slug?: string | null
          program_code?: string | null
          promo_code?: string
          promo_code_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_redemptions_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      purpose_applications: {
        Row: {
          amount_cents: number | null
          amount_paid: number
          application_submitted_at: string | null
          city: string | null
          cohort_key: string
          country: string | null
          created_at: string
          discount_minor: number | null
          grade_level: string | null
          id: string
          last_reminder_at: string | null
          match_method: string | null
          metadata: Json
          needs_review: boolean
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          pathway: string | null
          payment_currency: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_matched_at: string | null
          payment_reminder_sent_at: string | null
          payment_status: string | null
          pending_registration_email_sent_at: string | null
          pending_registration_reminders_sent: number
          program_code: string | null
          promo_code: string | null
          purchased_product_name: string | null
          referral_source: string | null
          registration_status: string
          reminder_count: number
          reviewer_notes: string | null
          scholarship_code: string | null
          school_name: string | null
          school_type: string | null
          status: string
          stripe_customer_id: string | null
          stripe_line_items: Json | null
          student_dob: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          submission_token: string
          updated_at: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          amount_cents?: number | null
          amount_paid?: number
          application_submitted_at?: string | null
          city?: string | null
          cohort_key: string
          country?: string | null
          created_at?: string
          discount_minor?: number | null
          grade_level?: string | null
          id?: string
          last_reminder_at?: string | null
          match_method?: string | null
          metadata?: Json
          needs_review?: boolean
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_currency?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_matched_at?: string | null
          payment_reminder_sent_at?: string | null
          payment_status?: string | null
          pending_registration_email_sent_at?: string | null
          pending_registration_reminders_sent?: number
          program_code?: string | null
          promo_code?: string | null
          purchased_product_name?: string | null
          referral_source?: string | null
          registration_status?: string
          reminder_count?: number
          reviewer_notes?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          school_type?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_line_items?: Json | null
          student_dob?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          submission_token?: string
          updated_at?: string
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          amount_cents?: number | null
          amount_paid?: number
          application_submitted_at?: string | null
          city?: string | null
          cohort_key?: string
          country?: string | null
          created_at?: string
          discount_minor?: number | null
          grade_level?: string | null
          id?: string
          last_reminder_at?: string | null
          match_method?: string | null
          metadata?: Json
          needs_review?: boolean
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_currency?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_matched_at?: string | null
          payment_reminder_sent_at?: string | null
          payment_status?: string | null
          pending_registration_email_sent_at?: string | null
          pending_registration_reminders_sent?: number
          program_code?: string | null
          promo_code?: string | null
          purchased_product_name?: string | null
          referral_source?: string | null
          registration_status?: string
          reminder_count?: number
          reviewer_notes?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          school_type?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_line_items?: Json | null
          student_dob?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          submission_token?: string
          updated_at?: string
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      purpose_masterclass_regs: {
        Row: {
          attendee_type: string | null
          city: string | null
          consent: boolean | null
          country: string | null
          created_at: string
          designation: string | null
          email: string | null
          email_sent_at: string | null
          full_name: string | null
          grade: string | null
          hear_about: string | null
          id: string
          masterclass_ids: string[] | null
          meta: Json
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          promotes_program_code: string | null
          referrer: string | null
          school: string | null
          sessions: string[] | null
          source_url: string | null
          state: string | null
          status: string
          student_grade: string | null
          student_name: string | null
          user_agent: string | null
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          attendee_type?: string | null
          city?: string | null
          consent?: boolean | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string | null
          email_sent_at?: string | null
          full_name?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          masterclass_ids?: string[] | null
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          promotes_program_code?: string | null
          referrer?: string | null
          school?: string | null
          sessions?: string[] | null
          source_url?: string | null
          state?: string | null
          status?: string
          student_grade?: string | null
          student_name?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          attendee_type?: string | null
          city?: string | null
          consent?: boolean | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string | null
          email_sent_at?: string | null
          full_name?: string | null
          grade?: string | null
          hear_about?: string | null
          id?: string
          masterclass_ids?: string[] | null
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          promotes_program_code?: string | null
          referrer?: string | null
          school?: string | null
          sessions?: string[] | null
          source_url?: string | null
          state?: string | null
          status?: string
          student_grade?: string | null
          student_name?: string | null
          user_agent?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      razorpay_payments: {
        Row: {
          amount: number | null
          amount_refunded: number | null
          bank: string | null
          contact: string | null
          created_date: string | null
          currency: string | null
          description: string | null
          email: string | null
          fee: number | null
          id: string
          international: string | null
          method: string | null
          notes: Json | null
          order_id: string | null
          payment_id: string
          refund_status: string | null
          status: string | null
          synced_at: string | null
          tax: number | null
          vpa: string | null
          wallet: string | null
        }
        Insert: {
          amount?: number | null
          amount_refunded?: number | null
          bank?: string | null
          contact?: string | null
          created_date?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          fee?: number | null
          id?: string
          international?: string | null
          method?: string | null
          notes?: Json | null
          order_id?: string | null
          payment_id: string
          refund_status?: string | null
          status?: string | null
          synced_at?: string | null
          tax?: number | null
          vpa?: string | null
          wallet?: string | null
        }
        Update: {
          amount?: number | null
          amount_refunded?: number | null
          bank?: string | null
          contact?: string | null
          created_date?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          fee?: number | null
          id?: string
          international?: string | null
          method?: string | null
          notes?: Json | null
          order_id?: string | null
          payment_id?: string
          refund_status?: string | null
          status?: string | null
          synced_at?: string | null
          tax?: number | null
          vpa?: string | null
          wallet?: string | null
        }
        Relationships: []
      }
      sat_applications: {
        Row: {
          amount: string | null
          challenge: string | null
          city: string | null
          cohort: string | null
          counselor_email: string | null
          counselor_name: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          google_form_status: number | null
          grade: string | null
          id: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_id: string | null
          payment_status: string | null
          referral_source: string | null
          scholarship_code: string | null
          school_name: string | null
          stripe_session_id: string | null
          student_dob: string | null
          student_email: string | null
          student_name: string | null
          student_phone: string | null
          synced_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount?: string | null
          challenge?: string | null
          city?: string | null
          cohort?: string | null
          counselor_email?: string | null
          counselor_name?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          google_form_status?: number | null
          grade?: string | null
          id: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          stripe_session_id?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          synced_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount?: string | null
          challenge?: string | null
          city?: string | null
          cohort?: string | null
          counselor_email?: string | null
          counselor_name?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          google_form_status?: number | null
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          stripe_session_id?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          synced_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      sat_masterclass_regs: {
        Row: {
          country: string
          created_at: string
          designation: string | null
          email: string
          email_sent: boolean
          full_name: string
          grade: string | null
          id: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string
          role: string
          school_name: string | null
          selected_sessions: string[]
          student_grade: string | null
          student_name: string | null
          synced_at: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          country: string
          created_at?: string
          designation?: string | null
          email: string
          email_sent?: boolean
          full_name: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone: string
          role: string
          school_name?: string | null
          selected_sessions?: string[]
          student_grade?: string | null
          student_name?: string | null
          synced_at?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          designation?: string | null
          email?: string
          email_sent?: boolean
          full_name?: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string
          role?: string
          school_name?: string | null
          selected_sessions?: string[]
          student_grade?: string | null
          student_name?: string | null
          synced_at?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      sirluther_applications: {
        Row: {
          amount_currency: string | null
          amount_paid: number | null
          application_submitted_at: string | null
          city: string | null
          cohort: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string
          created_at: string
          grade_level: string | null
          id: string
          motivation_essay: string
          notes: string | null
          parent_email: string
          parent_name: string | null
          payment_date: string | null
          payment_id: string | null
          payment_reminder_sent_at: string | null
          payment_status: string
          pending_registration_email_sent_at: string | null
          phone: string | null
          registration_status: string
          scholarship_code: string | null
          school_name: string
          state: string | null
          stripe_session_id: string | null
          student_dob: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount_currency?: string | null
          amount_paid?: number | null
          application_submitted_at?: string | null
          city?: string | null
          cohort?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country: string
          created_at?: string
          grade_level?: string | null
          id?: string
          motivation_essay: string
          notes?: string | null
          parent_email: string
          parent_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_reminder_sent_at?: string | null
          payment_status?: string
          pending_registration_email_sent_at?: string | null
          phone?: string | null
          registration_status?: string
          scholarship_code?: string | null
          school_name: string
          state?: string | null
          stripe_session_id?: string | null
          student_dob?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount_currency?: string | null
          amount_paid?: number | null
          application_submitted_at?: string | null
          city?: string | null
          cohort?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string
          created_at?: string
          grade_level?: string | null
          id?: string
          motivation_essay?: string
          notes?: string | null
          parent_email?: string
          parent_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_reminder_sent_at?: string | null
          payment_status?: string
          pending_registration_email_sent_at?: string | null
          phone?: string | null
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string
          state?: string | null
          stripe_session_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      sirluther_masterclass_regs: {
        Row: {
          category: string | null
          country: string | null
          created_at: string
          designation: string | null
          email: string
          full_name: string
          grade: string | null
          id: string
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          role: string
          school_name: string | null
          selected_sessions: string[]
          student_grade: string | null
          student_name: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          category?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          full_name: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          role: string
          school_name?: string | null
          selected_sessions?: string[]
          student_grade?: string | null
          student_name?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          category?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          full_name?: string
          grade?: string | null
          id?: string
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          role?: string
          school_name?: string | null
          selected_sessions?: string[]
          student_grade?: string | null
          student_name?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      stripe_payments: {
        Row: {
          amount: number | null
          card_name: string | null
          checkout_line_item_summary: string | null
          created_date_utc: string | null
          currency: string | null
          customer_email: string | null
          export_status: string | null
          id: string
          metadata: Json | null
          payment_intent_id: string | null
          payout_id: string | null
          plink: string | null
          processing_status: string | null
          program_code: string | null
          program_type: string | null
          reference: string | null
          school_name: string | null
          status: string | null
          student_email: string | null
          student_name: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount?: number | null
          card_name?: string | null
          checkout_line_item_summary?: string | null
          created_date_utc?: string | null
          currency?: string | null
          customer_email?: string | null
          export_status?: string | null
          id: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payout_id?: string | null
          plink?: string | null
          processing_status?: string | null
          program_code?: string | null
          program_type?: string | null
          reference?: string | null
          school_name?: string | null
          status?: string | null
          student_email?: string | null
          student_name?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount?: number | null
          card_name?: string | null
          checkout_line_item_summary?: string | null
          created_date_utc?: string | null
          currency?: string | null
          customer_email?: string | null
          export_status?: string | null
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payout_id?: string | null
          plink?: string | null
          processing_status?: string | null
          program_code?: string | null
          program_type?: string | null
          reference?: string | null
          school_name?: string | null
          status?: string | null
          student_email?: string | null
          student_name?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      teo_applications: {
        Row: {
          amount: number | null
          amount_paid: number | null
          anything_else: string | null
          city: string | null
          cohort: string | null
          cohort_id: string | null
          completion_status: string | null
          completion_token: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          grade_level: string | null
          id: string
          metadata: Json | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          pathway: string | null
          payment_date: string | null
          payment_id: string | null
          payment_intent_id: string | null
          payment_provider: string | null
          payment_status: string | null
          referral_source: string | null
          scholarship_code: string | null
          school_name: string | null
          school_type: string | null
          state: string | null
          stripe_customer_id: string | null
          stub_source: string | null
          student_dob: string | null
          student_email: string | null
          student_name: string | null
          student_phone: string | null
          submission_token: string
          submitted_at: string | null
          synced_at: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          amount?: number | null
          amount_paid?: number | null
          anything_else?: string | null
          city?: string | null
          cohort?: string | null
          cohort_id?: string | null
          completion_status?: string | null
          completion_token?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          grade_level?: string | null
          id: string
          metadata?: Json | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_provider?: string | null
          payment_status?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          school_type?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          submission_token?: string
          submitted_at?: string | null
          synced_at?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          amount?: number | null
          amount_paid?: number | null
          anything_else?: string | null
          city?: string | null
          cohort?: string | null
          cohort_id?: string | null
          completion_status?: string | null
          completion_token?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          grade_level?: string | null
          id?: string
          metadata?: Json | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          pathway?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_intent_id?: string | null
          payment_provider?: string | null
          payment_status?: string | null
          referral_source?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          school_type?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stub_source?: string | null
          student_dob?: string | null
          student_email?: string | null
          student_name?: string | null
          student_phone?: string | null
          submission_token?: string
          submitted_at?: string | null
          synced_at?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teo_applications_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "all_cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      teo_masterclass_regs: {
        Row: {
          attendee_type: string | null
          category: string
          consent: boolean
          country: string | null
          created_at: string
          designation: string | null
          email: string
          full_name: string
          grade: string | null
          id: string
          masterclass_ids: string[]
          meta: Json
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          school: string | null
          sessions: string[]
          status: string
          student_name: string | null
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }
        Insert: {
          attendee_type?: string | null
          category?: string
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          full_name: string
          grade?: string | null
          id?: string
          masterclass_ids?: string[]
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          school?: string | null
          sessions?: string[]
          status?: string
          student_name?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Update: {
          attendee_type?: string | null
          category?: string
          consent?: boolean
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          full_name?: string
          grade?: string | null
          id?: string
          masterclass_ids?: string[]
          meta?: Json
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          school?: string | null
          sessions?: string[]
          status?: string
          student_name?: string | null
          utm_campaign?: string
          utm_medium?: string
          utm_source?: string
        }
        Relationships: []
      }
      week_without_walls_inquiries: {
        Row: {
          backup_dates: string | null
          city: string | null
          contact_name: string | null
          contact_role: string | null
          country: string | null
          created_at: string | null
          email: string | null
          email_sent: boolean
          email_sent_at: string | null
          grade_levels: string[] | null
          id: string
          notes: string | null
          phone: string | null
          preferred_dates: string | null
          programs: string[] | null
          school_name: string | null
          source: string | null
          student_count: number | null
          synced_at: string | null
          updated_at: string | null
        }
        Insert: {
          backup_dates?: string | null
          city?: string | null
          contact_name?: string | null
          contact_role?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          email_sent?: boolean
          email_sent_at?: string | null
          grade_levels?: string[] | null
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_dates?: string | null
          programs?: string[] | null
          school_name?: string | null
          source?: string | null
          student_count?: number | null
          synced_at?: string | null
          updated_at?: string | null
        }
        Update: {
          backup_dates?: string | null
          city?: string | null
          contact_name?: string | null
          contact_role?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          email_sent?: boolean
          email_sent_at?: string | null
          grade_levels?: string[] | null
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_dates?: string | null
          programs?: string[] | null
          school_name?: string | null
          source?: string | null
          student_count?: number | null
          synced_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      yale_candidate: {
        Row: {
          amount: number | null
          application_number: string | null
          counselor_principal_email: string | null
          counselor_principal_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          currently_studying_in_class: string | null
          id: number
          name: string | null
          order_id: string | null
          parent_guardian_country_code: string | null
          parent_guardian_email_address: string | null
          parent_guardian_mobile_number: string | null
          parent_guardian_name: string | null
          payment_date: string | null
          payment_id: string | null
          registered_date: string | null
          scholarship_code: string | null
          school_name: string | null
          state: string | null
          status: string | null
          student_email_address: string | null
          student_mobile_number: string | null
          student_mobile_number_country_code: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          application_number?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          application_number?: string | null
          counselor_principal_email?: string | null
          counselor_principal_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          currently_studying_in_class?: string | null
          id?: never
          name?: string | null
          order_id?: string | null
          parent_guardian_country_code?: string | null
          parent_guardian_email_address?: string | null
          parent_guardian_mobile_number?: string | null
          parent_guardian_name?: string | null
          payment_date?: string | null
          payment_id?: string | null
          registered_date?: string | null
          scholarship_code?: string | null
          school_name?: string | null
          state?: string | null
          status?: string | null
          student_email_address?: string | null
          student_mobile_number?: string | null
          student_mobile_number_country_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      all_masterclasses_public: {
        Row: {
          apply_url: string | null
          audience: string | null
          capacity: number | null
          cohort_id: string | null
          cohort_label: string | null
          cohort_start_date: string | null
          description: string | null
          display_timezone: string | null
          duration_minutes: number | null
          ends_at: string | null
          host_bio: string | null
          host_image_url: string | null
          host_mentor_id: string | null
          host_name: string | null
          host_university: string | null
          id: string | null
          learning_outcomes: Json | null
          partner_id: string | null
          partner_logo_url: string | null
          partner_name: string | null
          program_id: string | null
          program_name: string | null
          recording_url: string | null
          scheduled_at: string | null
          series: string | null
          session_number: number | null
          slug: string | null
          status: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "all_masterclasses_host_mentor_id_fkey"
            columns: ["host_mentor_id"]
            isOneToOne: false
            referencedRelation: "all_mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "all_masterclasses_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "all_masterclasses_partner_program_fk"
            columns: ["partner_id", "program_id"]
            isOneToOne: false
            referencedRelation: "all_programs"
            referencedColumns: ["partner_id", "id"]
          },
          {
            foreignKeyName: "all_masterclasses_program_cohort_fk"
            columns: ["program_id", "cohort_id"]
            isOneToOne: false
            referencedRelation: "all_cohorts"
            referencedColumns: ["program_id", "id"]
          },
        ]
      }
    }
    Functions: {
      execute_split: {
        Args: { p_sm_ref: string; p_splits: Json }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      normalize_grade_level: { Args: { input: string }; Returns: string }
      normalize_place_name: { Args: { input: string }; Returns: string }
      research_role: { Args: { _user_id: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      application_status: "new" | "reviewed" | "accepted" | "rejected"
      attachment_entity_type:
        | "payment_stripe"
        | "payment_dbs"
        | "wallex_txn"
        | "vendor_bill"
        | "vendor_bill_line"
        | "program"
        | "overhead"
        | "travel"
        | "organisation"
        | "school"
        | "category"
        | "month"
      attachment_kind: "file" | "link" | "note" | "voice"
      conversion_status: "Converted" | "Lost" | "In Progress" | "Pending"
      enrollment_status: "active" | "paused" | "cancelled" | "completed"
      enrollment_tier: "saturday_club" | "explorer" | "accelerator"
      interest_level: "Hot" | "Warm" | "Cold" | "Not Interested"
      meeting_status:
        | "Scheduled"
        | "Completed"
        | "Cancelled"
        | "No Show"
        | "Rescheduled"
      user_role:
        | "sales_agent"
        | "admin"
        | "manager"
        | "super_admin"
        | "coordinator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      application_status: ["new", "reviewed", "accepted", "rejected"],
      attachment_entity_type: [
        "payment_stripe",
        "payment_dbs",
        "wallex_txn",
        "vendor_bill",
        "vendor_bill_line",
        "program",
        "overhead",
        "travel",
        "organisation",
        "school",
        "category",
        "month",
      ],
      attachment_kind: ["file", "link", "note", "voice"],
      conversion_status: ["Converted", "Lost", "In Progress", "Pending"],
      enrollment_status: ["active", "paused", "cancelled", "completed"],
      enrollment_tier: ["saturday_club", "explorer", "accelerator"],
      interest_level: ["Hot", "Warm", "Cold", "Not Interested"],
      meeting_status: [
        "Scheduled",
        "Completed",
        "Cancelled",
        "No Show",
        "Rescheduled",
      ],
      user_role: [
        "sales_agent",
        "admin",
        "manager",
        "super_admin",
        "coordinator",
      ],
    },
  },
} as const
