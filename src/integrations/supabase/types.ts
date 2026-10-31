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
    PostgrestVersion: "14.4"
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
          program_code: string | null
          program_id: string
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
          program_code?: string | null
          program_id: string
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
          program_code?: string | null
          program_id?: string
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
      all_conversions: {
        Row: {
          amount: number | null
          conversion_type: string
          currency: string | null
          id: string
          occurred_at: string
          partner_id: string
          program_code: string | null
          session_id: string | null
          source_id: string
          source_table: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string | null
        }
        Insert: {
          amount?: number | null
          conversion_type: string
          currency?: string | null
          id?: string
          occurred_at?: string
          partner_id: string
          program_code?: string | null
          session_id?: string | null
          source_id: string
          source_table: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Update: {
          amount?: number | null
          conversion_type?: string
          currency?: string | null
          id?: string
          occurred_at?: string
          partner_id?: string
          program_code?: string | null
          session_id?: string | null
          source_id?: string
          source_table?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_conversions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_conversions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "all_sessions"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "analytics_conversions_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "all_visitors"
            referencedColumns: ["visitor_id"]
          },
        ]
      }
      all_events: {
        Row: {
          element_label: string | null
          event_type: string
          id: string
          metadata: Json
          occurred_at: string
          page_path: string | null
          page_url: string | null
          partner_id: string
          program_code: string | null
          session_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visitor_id: string
        }
        Insert: {
          element_label?: string | null
          event_type: string
          id?: string
          metadata?: Json
          occurred_at?: string
          page_path?: string | null
          page_url?: string | null
          partner_id: string
          program_code?: string | null
          session_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id: string
        }
        Update: {
          element_label?: string | null
          event_type?: string
          id?: string
          metadata?: Json
          occurred_at?: string
          page_path?: string | null
          page_url?: string | null
          partner_id?: string
          program_code?: string | null
          session_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "all_sessions"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "analytics_events_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "all_visitors"
            referencedColumns: ["visitor_id"]
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
          is_published: boolean
          join_url: string | null
          learning_outcomes: Json
          page_copy: Json | null
          partner_id: string
          passcode: string | null
          program_id: string | null
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
          is_published?: boolean
          join_url?: string | null
          learning_outcomes?: Json
          page_copy?: Json | null
          partner_id: string
          passcode?: string | null
          program_id?: string | null
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
          is_published?: boolean
          join_url?: string | null
          learning_outcomes?: Json
          page_copy?: Json | null
          partner_id?: string
          passcode?: string | null
          program_id?: string | null
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
          program_name: string
          program_url: string | null
          short_description: string | null
          sticker_price: number
          updated_at: string
        }
        Insert: {
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
          program_name: string
          program_url?: string | null
          short_description?: string | null
          sticker_price: number
          updated_at?: string
        }
        Update: {
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
          program_name?: string
          program_url?: string | null
          short_description?: string | null
          sticker_price?: number
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
      all_sessions: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          entry_page_path: string | null
          entry_page_url: string | null
          ip: unknown
          last_active_at: string
          os: string | null
          partner_id: string
          referrer_url: string | null
          region: string | null
          session_id: string
          started_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page_path?: string | null
          entry_page_url?: string | null
          ip?: unknown
          last_active_at?: string
          os?: string | null
          partner_id: string
          referrer_url?: string | null
          region?: string | null
          session_id?: string
          started_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page_path?: string | null
          entry_page_url?: string | null
          ip?: unknown
          last_active_at?: string
          os?: string | null
          partner_id?: string
          referrer_url?: string | null
          region?: string | null
          session_id?: string
          started_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_sessions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_sessions_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "all_visitors"
            referencedColumns: ["visitor_id"]
          },
        ]
      }
      all_utm_mediums: {
        Row: {
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          medium_slug: string
          notes: string | null
          person: string | null
          platform: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          is_active?: boolean
          medium_slug: string
          notes?: string | null
          person?: string | null
          platform?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          medium_slug?: string
          notes?: string | null
          person?: string | null
          platform?: string | null
        }
        Relationships: []
      }
      all_utm_sources: {
        Row: {
          contact_email: string | null
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          notes: string | null
          source_kind: string
          source_slug: string
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          display_name: string
          id?: string
          is_active?: boolean
          notes?: string | null
          source_kind?: string
          source_slug: string
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          source_kind?: string
          source_slug?: string
        }
        Relationships: []
      }
      all_visitors: {
        Row: {
          browser: string | null
          device_type: string | null
          first_city: string | null
          first_country: string | null
          first_ip: unknown
          first_partner_id: string | null
          first_region: string | null
          first_seen_at: string
          first_utm_campaign: string | null
          first_utm_content: string | null
          first_utm_medium: string | null
          first_utm_source: string | null
          known_email: string | null
          last_city: string | null
          last_country: string | null
          last_ip: unknown
          last_region: string | null
          last_seen_at: string
          os: string | null
          total_sessions: number
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          device_type?: string | null
          first_city?: string | null
          first_country?: string | null
          first_ip?: unknown
          first_partner_id?: string | null
          first_region?: string | null
          first_seen_at?: string
          first_utm_campaign?: string | null
          first_utm_content?: string | null
          first_utm_medium?: string | null
          first_utm_source?: string | null
          known_email?: string | null
          last_city?: string | null
          last_country?: string | null
          last_ip?: unknown
          last_region?: string | null
          last_seen_at?: string
          os?: string | null
          total_sessions?: number
          visitor_id: string
        }
        Update: {
          browser?: string | null
          device_type?: string | null
          first_city?: string | null
          first_country?: string | null
          first_ip?: unknown
          first_partner_id?: string | null
          first_region?: string | null
          first_seen_at?: string
          first_utm_campaign?: string | null
          first_utm_content?: string | null
          first_utm_medium?: string | null
          first_utm_source?: string | null
          known_email?: string | null
          last_city?: string | null
          last_country?: string | null
          last_ip?: unknown
          last_region?: string | null
          last_seen_at?: string
          os?: string | null
          total_sessions?: number
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_visitors_first_partner_id_fkey"
            columns: ["first_partner_id"]
            isOneToOne: false
            referencedRelation: "all_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_app_config: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      automation_video_posts: {
        Row: {
          created_at: string
          drive_file_id: string
          drive_name: string
          ig_caption: string | null
          ig_error: string | null
          ig_media_id: string | null
          ig_status: string
          md5_checksum: string | null
          posted_date: string | null
          status: string
          storage_url: string | null
          yt_error: string | null
          yt_status: string
          yt_title: string | null
          yt_video_id: string | null
        }
        Insert: {
          created_at?: string
          drive_file_id: string
          drive_name: string
          ig_caption?: string | null
          ig_error?: string | null
          ig_media_id?: string | null
          ig_status?: string
          md5_checksum?: string | null
          posted_date?: string | null
          status?: string
          storage_url?: string | null
          yt_error?: string | null
          yt_status?: string
          yt_title?: string | null
          yt_video_id?: string | null
        }
        Update: {
          created_at?: string
          drive_file_id?: string
          drive_name?: string
          ig_caption?: string | null
          ig_error?: string | null
          ig_media_id?: string | null
          ig_status?: string
          md5_checksum?: string | null
          posted_date?: string | null
          status?: string
          storage_url?: string | null
          yt_error?: string | null
          yt_status?: string
          yt_title?: string | null
          yt_video_id?: string | null
        }
        Relationships: []
      }
      data_fix_log: {
        Row: {
          batch: string
          column_name: string
          fixed_at: string
          id: number
          new_value: string | null
          old_row: Json
          old_value: string | null
          reason: string
          row_id: string
          table_name: string
        }
        Insert: {
          batch: string
          column_name: string
          fixed_at?: string
          id?: number
          new_value?: string | null
          old_row: Json
          old_value?: string | null
          reason: string
          row_id: string
          table_name: string
        }
        Update: {
          batch?: string
          column_name?: string
          fixed_at?: string
          id?: number
          new_value?: string | null
          old_row?: Json
          old_value?: string | null
          reason?: string
          row_id?: string
          table_name?: string
        }
        Relationships: []
      }
      doctors_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
          student_id: string | null
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
          student_id?: string | null
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
          student_id?: string | null
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
      finlit_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
      lawyers_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
      lwl_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Relationships: []
      }
      lwl_form_responses: {
        Row: {
          created_at: string
          data: Json
          form_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json
          form_name: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          form_name?: string
          id?: string
          updated_at?: string
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
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Relationships: []
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
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
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
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
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
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          vpa?: string | null
          wallet?: string | null
        }
        Relationships: []
      }
      sat_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      sirluther_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
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
      stud_applications: {
        Row: {
          city: string | null
          city_country: string | null
          country: string | null
          created_at: string
          declaration_confirmed: boolean
          email: string
          full_name: string
          grade: string | null
          id: string
          parent_details: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          path: string
          path_reason: string
          phone: string | null
          school: string | null
          state: string | null
          student_dob: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city?: string | null
          city_country?: string | null
          country?: string | null
          created_at?: string
          declaration_confirmed?: boolean
          email: string
          full_name: string
          grade?: string | null
          id?: string
          parent_details?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          path: string
          path_reason: string
          phone?: string | null
          school?: string | null
          state?: string | null
          student_dob?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string | null
          city_country?: string | null
          country?: string | null
          created_at?: string
          declaration_confirmed?: boolean
          email?: string
          full_name?: string
          grade?: string | null
          id?: string
          parent_details?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          path?: string
          path_reason?: string
          phone?: string | null
          school?: string | null
          state?: string | null
          student_dob?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      teo_applications: {
        Row: {
          admin_notes: string | null
          amount: number | null
          city: string | null
          counsellor_email: string | null
          counsellor_name: string | null
          country: string | null
          created_at: string
          currency: string | null
          form_data: Json
          form_template_id: string | null
          grade: string | null
          id: string
          last_reminder_sent_at: string | null
          last_reminder_stage: string | null
          loa_sent_at: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_date: string | null
          payment_intent_id: string | null
          payment_link_id: string | null
          payment_mode: string | null
          payment_status: string
          program_category: string | null
          program_code: string | null
          program_name: string | null
          registration_email_sent_at: string | null
          registration_last_reminder_at: string | null
          registration_reminder_count: number
          registration_status: string
          scholarship_code: string | null
          school_name: string | null
          source_flow: string
          state: string | null
          stripe_customer_id: string | null
          student_dob: string | null
          student_email: string
          student_gender: string | null
          student_id: string | null
          student_mobile: string | null
          student_name: string
          submission_token: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visa_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          city?: string | null
          counsellor_email?: string | null
          counsellor_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          form_data?: Json
          form_template_id?: string | null
          grade?: string | null
          id?: string
          last_reminder_sent_at?: string | null
          last_reminder_stage?: string | null
          loa_sent_at?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_link_id?: string | null
          payment_mode?: string | null
          payment_status?: string
          program_category?: string | null
          program_code?: string | null
          program_name?: string | null
          registration_email_sent_at?: string | null
          registration_last_reminder_at?: string | null
          registration_reminder_count?: number
          registration_status?: string
          scholarship_code?: string | null
          school_name?: string | null
          source_flow?: string
          state?: string | null
          stripe_customer_id?: string | null
          student_dob?: string | null
          student_email?: string
          student_gender?: string | null
          student_id?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_token?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visa_status?: string | null
        }
        Relationships: []
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
      codes_dropdown: {
        Row: {
          code: string | null
          created_at: string | null
          id: string | null
          name: string | null
          ref_type: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          ref_type?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          ref_type?: string | null
        }
        Relationships: []
      }
      program_codes: {
        Row: {
          batch: string | null
          category: string | null
          country: string | null
          created_at: string | null
          date: string | null
          id: string | null
          is_stale: boolean | null
          last_synced_at: string | null
          organisation: string | null
          program: string | null
          ref_code: string | null
          school: string | null
          updated_at: string | null
          vault_id: string | null
        }
        Insert: {
          batch?: string | null
          category?: string | null
          country?: string | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          is_stale?: never
          last_synced_at?: string | null
          organisation?: string | null
          program?: string | null
          ref_code?: string | null
          school?: string | null
          updated_at?: string | null
          vault_id?: never
        }
        Update: {
          batch?: string | null
          category?: string | null
          country?: string | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          is_stale?: never
          last_synced_at?: string | null
          organisation?: string | null
          program?: string | null
          ref_code?: string | null
          school?: string | null
          updated_at?: string | null
          vault_id?: never
        }
        Relationships: []
      }
    }
    Functions: {
      execute_split: {
        Args: { p_sm_ref: string; p_splits: Json }
        Returns: Json
      }
      get_or_create_student_id: {
        Args: { _email: string; _mobile?: string; _name?: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_finance_admin: { Args: { _uid: string }; Returns: boolean }
      legacy_question_form_data: {
        Args: { _code: string; _existing: Json; _q: string[]; _tpl: string }
        Returns: Json
      }
      merge_form_answers: {
        Args: { _existing: Json; _incoming: Json }
        Returns: Json
      }
      normalize_grade_level: { Args: { input: string }; Returns: string }
      normalize_place_name: { Args: { input: string }; Returns: string }
      research_role: { Args: { _user_id: string }; Returns: string }
      resolve_student_id: {
        Args: { _email: string; _mobile?: string; _name?: string }
        Returns: string
      }
      student_id_in_use: { Args: { _id: string }; Returns: boolean }
      student_name_tokens: { Args: { _n: string }; Returns: string[] }
      student_names_match: {
        Args: { _a: string; _b: string }
        Returns: boolean
      }
      unaccent: { Args: { "": string }; Returns: string }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
